import Coupon from '@/domain/entities/Coupon'
import Dimension from '@/domain/entities/Dimension'
import Item from '@/domain/entities/Item'
import Order from '@/domain/entities/Order'

it('Deve criar um pedido vazio', () => {
  const order = new Order('886.634.854-68')
  const total = order.getTotal()
  expect(total).toBe(0)
})

it('Não deve criar um pedido com CPF inválido', () => {
  expect(() => new Order('111.111.111-11')).toThrowError('Cpf Inválido')
})

it('Deve criar um pedido com 3 itens', () => {
  const order = new Order('886.634.854-68')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  const total = order.getTotal()
  expect(total).toBe(6090)
})

it('Deve criar um pedido com 3 itens com cupom de desconto', () => {
  const order = new Order('886.634.854-68')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20, new Date('2023-03-01T10:00:00')))
  const total = order.getTotal()
  expect(total).toBe(4872)
})

it('Deve criar um pedido com 3 itens com cupom de desconto expirado', () => {
  const order = new Order('886.634.854-68', new Date('2022-03-10T10:00:00'))
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  order.addItem(new Item(2, 'Amplificador', 5000), 1)
  order.addItem(new Item(3, 'Cabo', 30), 3)
  order.addCoupon(new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00')))
  const total = order.getTotal()
  expect(total).toBe(6090)
})

it('Não deve fazer um pedido com quantidade de item negativa', () => {
  const order = new Order('886.634.854-68')
  expect(() => order.addItem(new Item(1, 'Guitarra', 1000), -1)).toThrow('Invalid quantity')
})

it('Não deve fazer um pedido com item duplicado', () => {
  const order = new Order('886.634.854-68')
  order.addItem(new Item(1, 'Guitarra', 1000), 1)
  expect(() => order.addItem(new Item(1, 'Guitarra', 1000), 1)).toThrow('Duplicated item')
})

it('Deve criar um pedido com 3 itens e calcular o frete', () => {
  const order = new Order('886.634.854-68')
  order.addItem(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)), 1)
  order.addItem(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50, 20)), 1)
  order.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10, 1)), 3)
  const total = order.getTotal()
  expect(total).toBe(6350)
})

it('Deve criar um pedido e gerar o código', () => {
  const order = new Order('886.634.854-68', new Date('2022-03-01T10:00:00'), 1)
  order.addItem(new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3)), 1)
  order.addItem(new Item(2, 'Amplificador', 5000, new Dimension(50, 50, 50, 20)), 1)
  order.addItem(new Item(3, 'Cabo', 30, new Dimension(10, 10, 10, 1)), 3)
  const code = order.getCode()
  expect(code).toBe('202200000001')
})
