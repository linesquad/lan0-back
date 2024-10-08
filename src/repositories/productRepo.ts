import ProductModel from "../models/product";

class ProductRepository {
  async CreateProduct(input: IncomingProductData) {
    try {
      return await ProductModel.create(input);
    } catch (error) {
      throw error;
    }
  }

  async GetProductById(productId: string) {
    try {
      return await ProductModel.findById(productId);
    } catch (error) {
      throw error;
    }
  }

  async GetProductsBasedOnCatId(catId: string) {
    try {
      return await ProductModel.find({ category: catId }).select(
        "image _id price discount title"
      );
    } catch (error) {
      throw error;
    }
  }

  async IncrementClickByOne(productId: string, target: string) {
    try {
      const targetField = target === "clickCount" ? "clickCount" : "clickOrder";
      return await ProductModel.findByIdAndUpdate(
        productId,
        { $inc: { [targetField]: 1 } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async UpdateProduct(input: ProductDocs) {
    try {
      return await ProductModel.findByIdAndUpdate(input._id, input, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async DeleteProduct(productId: string) {
    try {
      return await ProductModel.findByIdAndDelete(productId);
    } catch (error) {
      throw error;
    }
  }

  async GetPopularProducts() {
    try {
      return await ProductModel.aggregate([
        {
          $project: {
            _id: 1,
            title: 1,
            image: 1,
            price: 1,
            discount: 1,
            score: {
              $add: [
                { $multiply: ["$clickCount", 0.3] },
                { $multiply: ["$clickOrder", 0.7] },
              ],
            },
          },
        },
        { $sort: { score: -1 } },
      ]);
    } catch (error) {
      throw error;
    }
  }

  async GetDiscountProducts() {
    try {
      return await ProductModel.find({ discount: { $gt: 0 } }).select(
        "_id image price title discount"
      );
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
