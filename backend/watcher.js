const { BaseActionWatcher } = require("demux")
const { NodeosActionReader } = require("demux-eos") // eslint-disable-line
const ObjectActionHandler = require("./ObjectActionHandler")

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let bets = []

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function (client) {
      if (client === ws && data === 'betList' && bets.length > 0) {
        client.send(JSON.stringify(bets))
      }
    })
  })
})

const actionHandler = new ObjectActionHandler(
  [
    {
      actionType: "eosio.token::transfer",
      updater: function (state, payload, blockInfo, context) {}
    },
  ],
  [
    {
      actionType: "eosio.token::transfer",
      effect: function (state, payload, blockInfo, context) {
        /*if (payload.data.to === 'eosbetdice11' || payload.data.from === 'eosbetdice11') {
          console.log(payload.data.from, '->', payload.data.to, payload.data.quantity)
          bets.unshift(payload.data)
          if (bets.length > 10) bets.pop()
          wss.broadcast(JSON.stringify(payload.data))
        }
        if (payload.data.to === 'casineostest' || payload.data.from === 'casineostest') {
          console.log('================================')
          console.log(payload.data.from, '->', payload.data.to, payload.data.quantity)
          bets.unshift(payload.data)
          if (bets.length > 10) bets.pop()
          wss.broadcast(JSON.stringify(payload.data))
        }*/
        console.log('upd:', payload.data.from, '->', payload.data.to, payload.data.quantity)
      }
    }
  ]
)

const actionReader = new NodeosActionReader(
  "http://dev03.cryptolions.io:8890", // Thanks EOS Calgary!
  0, // Start at most recent blocks
)

const actionWatcher = new BaseActionWatcher(
  actionReader,
  actionHandler,
  350,
)

module.exports = actionWatcher
