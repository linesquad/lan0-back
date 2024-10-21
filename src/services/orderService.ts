import OrderRepository from "../repositories/orderRepo";
import ProductRepository from "../repositories/productRepo";
import {
  APiError,
  BadRequestError,
  serviceLayerError,
} from "../tools/customErrors";

class OrderService {
  private repository: OrderRepository;
  private productRepo: ProductRepository;

  constructor() {
    this.repository = new OrderRepository();
    this.productRepo = new ProductRepository();
  }

  async LoginService(input: IncomingLoginData) {
    try {
      const username = "username123";
      const password = "123456";
      if (username === input.username && password === input.password) {
        return true;
      }

      return false;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async PlaceOrderService(productId: string) {
    try {
      const shoppingInfo = await this.repository.GetShopping();
      if (!shoppingInfo) throw new APiError("Something went wrong.");
      await this.productRepo.IncrementClickByOne(productId, "orderCount");
      return shoppingInfo[0];
    } catch (error) {
      serviceLayerError(error);
    }
  }
}

export default OrderService;
