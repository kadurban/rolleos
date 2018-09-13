import {observable, action} from 'mobx'

class LatestBets {
  @observable bets = []

  @action wsClientInit = () => {
    const ws = new WebSocket("ws://62.76.44.36:8080/");

    ws.onmessage = (e) => this.updateBetList(e.data)

    ws.onerror = function(error) {
      console.error('Websocket error')
      console.error(error)
    }

    ws.onopen = function() {
      ws.send('betList')
    }
  }

  @action updateBetList = (data) => {
    let parsedData = JSON.parse(data)
    if (parsedData.length > 1) {
      this.bets = parsedData
    } else {
      this.bets.unshift(parsedData)
    }
    if (this.bets.length > 10) {
      this.bets.pop()
    }
  }
}


const latestBets = new LatestBets()
export default latestBets