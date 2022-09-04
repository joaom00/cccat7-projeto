import PreviewOrder from '@/application/PreviewOrder'
import Connection from '@/infra/database/Connection'
import Http from '@/infra/http/Http'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'

export default class OrderController {
  constructor(readonly http: Http, readonly connection: Connection) {
    http.on('post', '/orderPreview', async (_params, body) => {
      const itemRepository = new ItemRepositoryDatabase(connection)
      const previewOrder = new PreviewOrder(itemRepository)
      const output = await previewOrder.execute(body as any)
      return output
    })
  }
}
