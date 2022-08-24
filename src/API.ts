import express from 'express'
import pgp from 'pg-promise'
import Dimension from './Dimension'
import Item from './Item'
import Order from './Order'

const app = express()
app.use(express.json())

const connection = pgp()('postgres://postgres:123456@localhost:5432/app')

app.post('/orderPreview/:postId', async (req, res) => {
  const order = new Order(req.body.cpf)
  for (const orderItem of req.body.orderItems) {
    const [itemData] = await connection.query('select * from ccca.item where id_item = $1', [
      orderItem.idItem
    ])
    const item = new Item(
      itemData.id_item,
      itemData.description,
      parseFloat(itemData.price),
      new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight)
    )
    order.addItem(item, orderItem.quantity)
  }
  res.json({
    total: order.getTotal()
  })
})

app.listen(3000)
