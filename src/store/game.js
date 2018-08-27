import {observable, action} from 'mobx'
import Eos from "eosjs";
import request from "async-request";
import appStore from "../store/app";
import getAccountName from "../lib/getAccountName";

const network = {
  protocol: 'https',
  blockchain: 'eos',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
}

const eosConfig = {
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
};

class Game {
  @observable betSize = 0.1
  @observable maxBet = 100
  @observable chance = 50
  @observable profit = 0

  @action setMaxBet = async () => {
    const eos = appStore.scatter.eos(network, Eos, eosConfig);
    let balance = await eos.getCurrencyBalance('eosio.token', 'kadurban1111'); // TODO: replace contract name
    //this.maxBet = parseInt(balance[0].split(' ')[0], 10)
    console.log(balance[0])
  }

  @action setBet = (value) => {
    this.betSize = parseFloat(value)
    this.setProfit()
  }

  @action setChance = (value) => {
    this.chance = parseInt(value, 10)
    this.setProfit()
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
    } else {
      const rendomResponse = await request('https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain')
      const num = parseInt(rendomResponse.body, 10)
      const transferParams = {from: 'kadurban1111', to: 'rudexgateway', quantity: '1.0000 EOS', memo: 'dex:kadurban777'}

      await eos.transaction(eos => {
          eos.transfer(transferParams)
          //eos.transfer('inita', 'initc', '1.0000 SYS', ''/*memo*/)
        }
      ).catch(e => trxErrorHandler(e))
    }
  }

  @action setProfit = () => {
    this.profit = ((1.0 / (this.chance / 100)) * this.betSize * 0.99).toFixed(4) // (1.0/chance_win)*bet*.99
  }

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
  if (err.error && err.error.what) {
    toast.error(err.error.what)
  }
  if (err.message && err.isError) {
    toast.error(err.message)
  }
}

const game = new Game()
export default game