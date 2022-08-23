import Dimension from '@/Dimension'

it('Não deve ter largura negativa', () => {
  expect(() => new Dimension(-1, 0, 0, 0)).toThrow(new Error('Invalid dimension'))
})

it('Não deve ter altura negativa', () => {
  expect(() => new Dimension(0, -1, 0, 0)).toThrow(new Error('Invalid dimension'))
})

it('Não deve ter profundidade negativa', () => {
  expect(() => new Dimension(0, 0, -1, 0)).toThrow(new Error('Invalid dimension'))
})

it('Não deve ter peso negativo', () => {
  expect(() => new Dimension(0, 0, 0, -1)).toThrow(new Error('Invalid dimension'))
})
