export default class Coupon {
  constructor(readonly code: string, readonly percentage: number, readonly expiredDate: Date) {}

  isExpired(date: Date): boolean {
    return this.expiredDate.getTime() < date.getTime()
  }

  getDiscount(total: number): number {
    return (total * this.percentage) / 100
  }
}
