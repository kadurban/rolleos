import {observable, action, computed} from 'mobx'
import Eos from "eosjs";

class Profile {
  @observable betSize = 0.1
  @observable maxBet = 100
  @observable chance = 50
  @observable profit = 0

  @action setBet = (value) => {
    this.betSize = parseInt(value, 10)
    this.setProfit()
  }

  @action setChance = (value) => {
    this.chance = parseInt(value, 10)
    this.setProfit()
  }

  network = 1 === 1 ? { // if is testnet
    protocol: 'http',
    blockchain: 'eos',
    host: 'dev.cryptolions.io',
    port: 38888,
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  } : {
    protocol: 'https',
    blockchain: 'eos',
    host: 'nodes.get-scatter.com',
    port: 443,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  }

  getAccountName(identity) {
    if (identity.accounts && Array.isArray(identity.accounts) && identity.accounts.length > 0) {
      return identity.accounts[0].name;
    } else {
      throw Error("Account not found!");
    }
  }

  eosConfig = {
    chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
  };

  @action sendTransaction = function (funcName, data) {
    return store.app.scatter
      .suggestNetwork(this.network)
      .then(() => store.app.scatter.getIdentity({accounts: [this.network]}))
      .then((identity) => {
        let accountName = this.getAccountName(identity);

        // wrap eos instance
        const eos = store.app.scatter.eos(this.network, Eos, this.eosConfig);

        return eos.transaction(accountName, (contract) => {
          contract[funcName](data, {authorization: accountName})
        })
      })
  }

  @action roll = (e) => {
    e.preventDefault()
    let scParams = {user: 'hellomike'}

    store.app.scatter
      .suggestNetwork(this.network)
      .then(() => store.app.scatter.getIdentity({accounts: [this.network]}))
      .then((identity) => {
        let accountName = this.getAccountName(identity);
        const eos = store.app.scatter.eos(this.network, Eos, this.eosConfig);
        return eos.transaction(accountName, (contract) => {
          contract['hi'](scParams, {authorization: accountName})
        })
      })
  }

  @action setProfit = () => {
    this.profit = (1.0 / (this.chance / 100)) * this.betSize * 0.99
    // (1.0/chance_win)*bet*.99
  }
}

const profile = new Profile()
export default profile