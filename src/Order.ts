import Coupon from './Coupon'
import Cpf from './Cpf'
import Item from './Item'
import OrderItem from './OrderItem'

export default class Order {
  orderItems: OrderItem[]
  cpf: Cpf
  coupon?: Coupon

  constructor(cpf: string, readonly date: Date = new Date()) {
    this.cpf = new Cpf(cpf)
    this.orderItems = []
  }

  addItem(item: Item, quantity: number): void {
    if (quantity <= 0) throw new Error('Invalid quantity')
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
  }

  addCoupon(coupon: Coupon): void {
    if (coupon?.isExpired(this.date)) return
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
    return total
  }
}
