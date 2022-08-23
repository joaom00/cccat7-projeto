import Dimension from '@/Dimension'
import FreightCalculator from '@/FreightCalculator'
import Item from '@/Item'

it('Deve calcular o frete', () => {
  const item = new Item(1, 'Guitarra', 1000, new Dimension(100, 30, 10, 3))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(30)
})

it('Deve calcular o frete com preço mínimo', () => {
  const item = new Item(3, 'Cabo', 30, new Dimension(10, 10, 10, 0.9))
  const freight = FreightCalculator.calculate(item)
  expect(freight).toBe(10)
})
