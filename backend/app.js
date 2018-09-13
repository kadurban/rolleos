const Koa = require('koa')
const session = require('koa-session')
const koaBody = require('koa-body')
const config = require('./package.json').config
const mysql = require('rslib').mysql
const actionWatcher = require('./watcher')

const transform = require('./middleware/transform')
const errorHandler = require('./middleware/errorHandler')
const cors = require('./middleware/cors')

const router = require('./router')

process.on('unhandledRejection', (reason, err) => {
  console.error(reason, err)
})

const app = new Koa()
app.proxy = true

async function init () {
  app.context.db = await mysql.getInstance({
    host: 'localhost',
    user: 'eosmail',
    password: 'eosmail',
    database: 'eosmail',
    connectionLimit: 10
  })
  global.esc = app.context.db.esc

  app.use(session({
    key: 'koa:sess',
    signed: false,
    maxAge: 86400000,
    httpOnly: false
  }, app))

  app.use(koaBody({
    multipart: true,
    patchNode: true,
    patchKoa: true
  }))

  app.use(errorHandler)
  app.use(cors)
  app.use(transform)

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(config.port)
  console.log(`App running on port ${config.port}`)
  actionWatcher.watch()

}

init()