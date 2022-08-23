import Coupon from '@/Coupon'

it('Deve criar um cupom de desconto', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00'))
  const discount = coupon.getDiscount(1000)
  expect(discount).toBe(200)
})

it('Deve criar um cupom de desconto expirado', () => {
  const coupon = new Coupon('VALE20', 20, new Date('2022-03-01T10:00:00'))
  const isExpired = coupon.isExpired(new Date('2022-03-10T10:00:00'))
  expect(isExpired).toBe(true)
})
