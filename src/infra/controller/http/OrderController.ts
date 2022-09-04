import PreviewOrder from "@/application/PreviewOrder"
import Connection from "@/infra/database/Connection"
import Http from "@/infra/http/Http"
import ItemRepositoryMemory from "@/infra/repository/memory/ItemRepositoryMemory"

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
