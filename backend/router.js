const Router = require('koa-router')
const { exec } = require('child-process-async')
const Eos = require('eosjs')
const r = Router()

const mainnet = false

const eosConfig = mainnet ? {
  keyProvider: process.env.PK,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  httpEndpoint: 'https://nodes.get-scatter.com:8888',
  sign: true
} : {
  keyProvider: '5JVabmrVfCeZheVSeNZm6wgLeFr6Hd8qcYvr3y92WK8LVeAi7LV',
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca',
  httpEndpoint: 'http://dev.cryptolions.io:38888',
  /*debug: true,*/
  /*expireInSeconds: 60,*/
  sign: true,
  authorization: 'casineostest@active',
  broadcast: 'false'
}

const eos = Eos(eosConfig)

r.post('/pre-roll', async (ctx, next) => {
  let props = {...ctx.props}

  const user = props.body.user
  const usersecret = props.body.usersecret
  const casinosecret = props.body.casinosecret

  const userhash = (await exec(`echo -n '${usersecret}' | xxd -r -p | sha256sum -b | awk '{print $1}'`)).stdout;
  const casionohash = (await exec(`echo -n '${casinosecret}' | xxd -r -p | sha256sum -b | awk '{print $1}'`)).stdout;

  console.log('casinohash: ' + casionohash, casionohash.length)
  console.log('userhash: ' + userhash, userhash.length)
  let tx = await eos.transaction({
    actions: [{
        account: 'casineostest',
        name: 'casinohash',
        authorization: [{
          actor: 'casineostest',
          permission: 'active'
        }],
        data: {user, hash: casionohash}
      }, {
        account: 'casineostest',
        name: 'casinosecret',
        authorization: [{
          actor: 'casineostest',
          permission: 'active'
        }],
        data: {user, secret: casinosecret}
      }]
    })

  console.log(tx)

  ctx.body = {
    userhash
  }

  await next()
})

r.post('/start', async (ctx, next) => {
  let props = {...ctx.props}

  const user = props.body.user

  await eos.transaction({
    actions: [{
      account: 'casineostest',
      name: 'casinohash',
      authorization: [{
        actor: 'casineostest',
        permission: 'active'
      }],
      data: {user}
    }]
  })

  console.log('game started...')

  ctx.body = ''

  await next()
})

module.exports = r
