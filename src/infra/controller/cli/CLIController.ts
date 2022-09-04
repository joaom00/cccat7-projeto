import PreviewOrder from '@/application/PreviewOrder'
import CLIManager from '@/infra/cli/CLIManager'
import PgPromiseAdapter from '@/infra/database/PgPromiseAdapter'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'

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
