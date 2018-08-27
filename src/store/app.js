import { observable, action } from 'mobx'

import appStore from '../store/app'
import gameStore from '../store/game'

class App {
  @observable loading = true
  @observable scatter = null
  @observable identity = null

  @action ensureScatter = () => {
    document.addEventListener('scatterLoaded', () => {
      this.scatter = window.scatter
      window.scatter = null
      gameStore.setMaxBet()
      //this.ensureIdentity()
    })
  }

  @action ensureIdentity = () => {
    this.identity = appStore.scatter.identity
  }
}

const app = new App()
export default app