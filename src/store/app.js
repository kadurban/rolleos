import { observable, action } from 'mobx'

class App {
  @observable loading = true
  @observable scatter = null
  @observable identity = null

  @action ensureScatter = () => {
    document.addEventListener('scatterLoaded', () => {
      this.scatter = window.scatter
      this.ensureIdentity()
    })
  }

  @action ensureIdentity = () => {
    this.identity = store.app.scatter.identity
  }
}

const app = new App()
export default app