import Order from '@/domain/entities/Order'
import ItemRepository from '@/domain/repository/ItemRepository'

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
    const total = order.getTotal()
    return { total }
  }
}
