import CLIManager from './CLIManager'
import ItemRepositoryDatabase from './ItemRepositoryDatabase'
import PgPromiseAdapter from './PgPromiseAdapter'
import PreviewOrder from './PreviewOrder'

export default class CLIController {
  constructor(cliManager: CLIManager) {
    let cpf = ''
    const orderItems: { idItem: number; quantity: number }[] = []
    cliManager.addCommand('cpf', params => {
      cpf = params
    })
    cliManager.addCommand('add-item', params => {
      const [idItem, quantity] = params.split(' ')
      orderItems.push({ idItem: parseInt(idItem), quantity: parseInt(quantity) })
    })
    cliManager.addCommand('preview', async () => {
      const connection = new PgPromiseAdapter()
      const itemRepository = new ItemRepositoryDatabase(connection)
      const previewOrder = new PreviewOrder(itemRepository)
      const input = { cpf, orderItems }
      const output = await previewOrder.execute(input)
      return `total: ${output.total}`
    })
  }
}
