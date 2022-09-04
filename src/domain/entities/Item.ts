import Dimension from './Dimension'

export default class Item {
  constructor(
    readonly idItem: number,
    readonly description: string,
    readonly price: number,
    readonly dimension: Dimension = new Dimension(0, 0, 0, 0)
  ) {}

  getVolume(): number {
    return this.dimension.getVolume()
  }

  getDensity(): number {
    return this.dimension.getDensity()
  }
}
