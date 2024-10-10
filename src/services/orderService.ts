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

  async CreateShippingService(input: IncomingShippingData) {
    try {
      const newShippingInfo = await this.repository.CreateShipping(input);
      if (!newShippingInfo)
        throw new BadRequestError(
          "Something went wrong during creating process."
        );
      return newShippingInfo;
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
