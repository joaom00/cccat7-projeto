import PreviewOrder from '@/application/PreviewOrder'
import PgPromiseAdapter from '@/infra/database/PgPromiseAdapter'
import ItemRepositoryDatabase from '@/infra/repository/database/ItemRepositoryDatabase'

it('Deve simular um pedido', async () => {
  const connection = new PgPromiseAdapter()
  const itemRepository = new ItemRepositoryDatabase(connection)
  const previewOrder = new PreviewOrder(itemRepository)
  const output = await previewOrder.execute({
    cpf: '886.634.854-68',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ]
  })
  expect(output.total).toBe(6350)
  await connection.close()
})
