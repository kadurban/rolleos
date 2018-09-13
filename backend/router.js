const Router = require('koa-router')
const moment = require('moment')
const r = Router()

r.post('/filter', async (ctx, next) => {
  let props = {...ctx.props}
  /*
  account_name
  indexed
  bp
  core_liquid_balance
  ram_quota
  created
  ram_usage
  net_weight
  net_used
  net_available
  net_max
  cpu_weight
  cpu_used
  cpu_available
  cpu_max
  * */
  let {
    created_from,
    created_to,
    core_liquid_balance_from,
    core_liquid_balance_to
  } = props.body

  let found = await ctx.db.query(`
    SELECT account_name
    FROM accounts WHERE
    created >= ${esc(moment(created_from).format('YYYY-MM-DD'))} AND
    created <= ${esc(moment(created_to).format('YYYY-MM-DD'))} AND
    core_liquid_balance >= ${esc(core_liquid_balance_from)} AND
    core_liquid_balance <= ${esc(core_liquid_balance_to)}
  `)
  ctx.body = {
    recipientsTotal: found.length
  }
  await next()
})

module.exports = r
