import ShippingModel from "../models/shipping";

class OrderRepository {
  async CreateShipping(input: IncomingShippingData) {
    return await ShippingModel.create(input);
  }

  async GetShopping() {
    return await ShippingModel.find();
  }
}

export default OrderRepository;
