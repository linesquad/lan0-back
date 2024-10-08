import OrderRepository from "../repositories/orderRepo";
import ProductRepository from "../repositories/productRepo";

class OrderService {
  private repository: OrderRepository;
  private productRepo: ProductRepository;

  constructor() {
    this.repository = new OrderRepository();
    this.productRepo = new ProductRepository();
  }

  async CreateShippingService(input: IncomingShippingData) {
    const newShippingInfo = await this.repository.CreateShipping(input);
    if (!newShippingInfo) throw new Error();
    return newShippingInfo;
  }

  async PlaceOrderService(productId: string) {
    const shoppingInfo = await this.repository.GetShopping();
    if (!shoppingInfo) throw new Error();
    await this.productRepo.IncrementClickByOne(productId, "orderCount");
    return shoppingInfo[0];
  }
}

export default OrderService;
