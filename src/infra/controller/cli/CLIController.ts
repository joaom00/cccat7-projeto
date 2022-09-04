import PreviewOrder from '@/application/PreviewOrder'
import CLIManager from '@/infra/cli/CLIManager'
import Connection from '@/infra/database/Connection'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'

export default class CLIController {
  constructor(cliManager: CLIManager, readonly connection: Connection) {
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
      const itemRepository = new ItemRepositoryDatabase(connection)
      const previewOrder = new PreviewOrder(itemRepository)
      const input = { cpf, orderItems }
      const output = await previewOrder.execute(input)
      return `total: ${output.total}`
    })
  }
}
