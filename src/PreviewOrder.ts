import Order from './Order'
import ItemRepository from './ItemRepository'

type Input = {
  cpf: string
  orderItems: Array<{
    idItem: number
    quantity: number
  }>
}

type Output = {
  total: number
}

export default class PreviewOrder {
  constructor(private itemRepository: ItemRepository) {}
  async execute(input: Input): Promise<Output> {
    const order = new Order(input.cpf)
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.getItem(orderItem.idItem)
      order.addItem(item, orderItem.quantity)
    }
    return { total: order.getTotal() }
  }
}
