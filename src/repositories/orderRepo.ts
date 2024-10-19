import ShippingModel from "../models/shipping";

class OrderRepository {
  async CreateLogin(input: IncomingLoginData) {
    return await ShippingModel.create(input);
  }

  async GetShopping() {
    return await ShippingModel.find();
  }
}

export default OrderRepository;
