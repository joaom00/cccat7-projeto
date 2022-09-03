import Connection from './Connection'
import Http from './Http'
import ItemRepositoryMemory from './ItemRepositoryMemory'
import PreviewOrder from './PreviewOrder'

export default class Router {
  constructor(readonly http: Http, private connection: Connection) {
    http.on('post', '/orderPreview', async (_params, body) => {
      const itemRepository = new ItemRepositoryMemory()
      const previewOrder = new PreviewOrder(itemRepository)
      const output = await previewOrder.execute(body as any)
      return output
    })
  }
}
