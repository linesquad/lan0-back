import ShippingModel from "../models/shipping";

class OrderRepository {
  async CreateShipping(input: IncomingShippingData) {
    try {
      return await ShippingModel.create(input);
    } catch (error) {
      throw error;
    }
  }

  async GetShopping() {
    try {
      return await ShippingModel.find();
    } catch (error) {
      throw error;
    }
  }
}

export default OrderRepository;
