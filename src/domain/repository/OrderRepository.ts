import Order from "../entities/Order";

export default interface OrderRepository {
  save(order: Order): Promise<void>
}
