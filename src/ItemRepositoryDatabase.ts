import Connection from './Connection'
import Dimension from './Dimension'
import Item from './Item'
import ItemRepository from './ItemRepository'

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(private connection: Connection) {}

  async getItem(idItem: number): Promise<Item> {
    const [itemData] = await this.connection.query('select * from ccca.item where id_item = $1', [
      idItem
    ])
    const item = new Item(
      itemData.id_item,
      itemData.description,
      parseFloat(itemData.price),
      new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight)
    )
    return item
  }
}
