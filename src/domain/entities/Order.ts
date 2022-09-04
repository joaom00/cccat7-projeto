import Coupon from './Coupon'
import Cpf from './Cpf'
import FreightCalculator from './FreightCalculator'
import Item from './Item'
import OrderCode from './OrderCode'
import OrderItem from './OrderItem'

export default class Order {
  orderItems: OrderItem[]
  cpf: Cpf
  coupon?: Coupon
  freight = 0
  private code: OrderCode

  constructor(cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
    this.code = new OrderCode(date, sequence)
  }

  getCode(): string {
    return this.code.value
  }

  addItem(item: Item, quantity: number): void {
    if (this.orderItems.some(orderItem => orderItem.idItem === item.idItem)) {
      throw new Error('Duplicated item')
    }
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
    this.freight += FreightCalculator.calculate(item) * quantity
  }

  addCoupon(coupon: Coupon): void {
    if (coupon.isExpired(this.date)) return
    this.coupon = coupon
  }

  getTotal(): number {
    let total = this.orderItems.reduce((total, orderItem) => {
      total += orderItem.getTotal()
      return total
    }, 0)
    if (this.coupon) {
      total -= this.coupon.getDiscount(total)
    }
    if (this.freight) {
      return (total += this.freight)
    }
    return total
  }
}
