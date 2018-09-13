import {observable, action} from 'mobx'
import Eos from "eosjs";
import axios from "axios";
import appStore from "../store/app";
import getAccountName from "../lib/getAccountName";

const mainnet = false

const network = mainnet ? {
  protocol: 'https',
  blockchain: 'eos',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
} : {
  protocol: 'http',
  blockchain: 'eos',
  host: 'dev.cryptolions.io',
  port: 38888,
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
}

const eosConfig = mainnet ? {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
} : {
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
}

class Game {
  @observable num = 0
  @observable betSize = 0.1
  @observable maxBet = 100
  @observable chance = 50
  @observable profit = 0

  @action setMaxBet = async () => {
    const eos = appStore.scatter.eos(network, Eos, eosConfig);
    let bettorBalance = await eos.getCurrencyBalance('eosio.token', mainnet ? 'kadurban1111' : 'casineostest'); // TODO: replace contract name
    bettorBalance = parseFloat(bettorBalance[0].split(' ')[0])
    this.maxBet = parseInt(bettorBalance / 100 * 50) // TODO: 1% of casino balance
  }

  @action setBet = (value) => {
    this.betSize = parseFloat(value)
    this.setProfit()
  }

  @action setChance = (value) => {
    this.chance = parseInt(value, 10)
    this.setProfit()
  }

  @action setProfit = () => {
    this.profit = ((1.0 / (this.chance / 100)) * this.betSize * 0.99).toFixed(4) // (1.0/chance_win)*bet*.99
  }

  @action roll = async (e) => {
    e.preventDefault()
    const eos = appStore.scatter.eos(network, Eos, eosConfig);

    if (!appStore.identity) {
      appStore.scatter
        .suggestNetwork(network)
        .then(() => appStore.scatter.getIdentity({accounts: [network]}))
        .then((identity) => {
          appStore.identity = identity
          toast.info(`Logged in as ${getAccountName(appStore.identity)}`)
        })
        .catch(e => console.log(e))
    } else {
      let userAccountName = getAccountName(appStore.identity)
      let userhash, usersecret, casinosecret

      if (!localStorage['usersecret']) {
        usersecret = await randomSecret()
        localStorage['usersecret'] = usersecret
      } else {
        usersecret = localStorage['usersecret']
      }
      casinosecret = await randomSecret()
      userhash = await preRoll(userAccountName, normalizeSecret(usersecret), normalizeSecret(casinosecret))

      console.log('userhash: ' + userhash, userhash.length)
      await eos.transaction({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: userAccountName,
            permission: 'active'
          }],
          data: {
            from: userAccountName,
            to: 'casineostest',
            quantity: `${this.betSize.toFixed(4)} EOS`,
            memo: this.chance
          }
        }, {
          account: 'casineostest',
          name: 'userhash',
          authorization: [{
            actor: userAccountName,
            permission: 'active'
          }],
          data: {user: userAccountName, hash: userhash}
        }, {
          account: 'casineostest',
          name: 'usersecret',
          authorization: [{
            actor: userAccountName,
            permission: 'active'
          }],
          data: {user: userAccountName, secret: usersecret}
        }]
      })

      /*if (userhash && usersecret) {
        await eos.transaction(['eosio.token', 'casineostest'], ({eosio_token, casineostest}) => {
          const transferParams = {
            from: userAccountName,
            to: 'casineostest',
            quantity: `${this.betSize.toFixed(4)} EOS`,
            memo: this.chance
          }
          eosio_token.transfer(transferParams, {authorization: userAccountName})
          casineostest.userhash({user: userAccountName, hash: userhash}, {authorization: userAccountName})
          casineostest.usersecret({user: userAccountName, secret: usersecret}, {authorization: userAccountName})
        }).catch(e => trxErrorHandler(e))
      }*/

      await startGame(userAccountName)

      await this.setMaxBet()
    }
  }

}

async function startGame(user) {
  try {
    await axios.post('http://localhost:3001/start', {user})
  } catch (error) {
    console.log(error)
  }
}

async function preRoll(user, usersecret, casinosecret) {
  try {
    let response = await axios.post('http://localhost:3001/pre-roll', {user, usersecret, casinosecret})
    return response.data.userhash
  } catch (error) {
    console.log(error)
  }
}

async function randomSecret() {
  try {
    let response = await axios.post('https://www.random.org/cgi-bin/randbyte?nbytes=32&format=h')
    return response.data
  } catch (error) {
    console.log(error)
  }
}

function normalizeSecret(val) {
  let normalized = val.replace(/\s/g, '')
  if (val.length > 64) {
    normalized = normalized.substring(0, 64)
  }
  if (val.length < 64) {
    for (let i = normalized.length; i < 64; i++) {
      normalized += '0'
    }
  }
  return normalized
}

function trxErrorHandler(err) {
  if (typeof err === 'string') {
    try {
      err = JSON.parse(err)
    } catch (e) {
      console.log(e)
      toast.error('Unknown error')
    }
  }
  console.log(err)
  if (err.error && err.error.what) {
    toast.error(err.error.what)
  }
  if (err.message && err.isError) {
    toast.error(err.message)
  }
}

const game = new Game()
export default game