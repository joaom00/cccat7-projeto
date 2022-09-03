import ExpressAdapter from './ExpressAdapter'
import PgPromiseAdapter from './PgPromiseAdapter'
import Router from './Router'

const http = new ExpressAdapter()
const connection = new PgPromiseAdapter()
new Router(http, connection)
http.listen(3000)
