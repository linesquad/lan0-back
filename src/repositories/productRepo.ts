import { IncomingProductData, ProductDocs } from "../dto/product";
import AccessoryModel from "../models/accesory";
import MealModel from "../models/meal";
import ProductModel from "../models/product";
import SelfCareModel from "../models/selfCare";
import ToyModel from "../models/toy";

class ProductRepository {
  async CreateProduct(input: IncomingProductData) {
    const { mealDetails, accessoryDetails, toyDetails, selfCareDetails } =
      input;

    try {
      let productDetailId = null;
      let productData = null;

      if (mealDetails) {
        const meal = await MealModel.create(mealDetails);
        if (!meal) throw new Error("Meal creation failed.");
        productDetailId = meal._id;
        productData = { ...input, mealDetails: meal._id };
      } else if (accessoryDetails) {
        const accessory = await AccessoryModel.create(accessoryDetails);
        if (!accessory) throw new Error("Accessory creation failed.");
        productDetailId = accessory._id;
        productData = { ...input, accessoryDetails: accessory._id };
      } else if (toyDetails) {
        const toy = await ToyModel.create(toyDetails);
        if (!toy) throw new Error("Toy creation failed.");
        productDetailId = toy._id;
        productData = { ...input, toyDetails: toy._id };
      } else if (selfCareDetails) {
        const selfCare = await SelfCareModel.create(selfCareDetails);
        if (!selfCare) throw new Error("Self-care creation failed.");
        productDetailId = selfCare._id;
        productData = { ...input, selfCareDetails: selfCare._id };
      } else {
        throw new Error("No product details provided.");
      }

      // Create the final product using the productData
      const entireProduct = await ProductModel.create(productData);
      if (!entireProduct) throw new Error("Product creation failed.");

      return entireProduct;
    } catch (error) {
      throw error; // Rethrow error to handle higher up if needed
    }
  }

  async GetProductById(productId: string) {
    try {
      return await ProductModel.findById(productId)
        .populate({
          path: "mealDetails",
          model: "Meal",
        })
        .populate({
          path: "accessoryDetails",
          model: "Accessory",
        })
        .populate({
          path: "toyDetails",
          model: "Toy",
        })
        .populate({
          path: "selfCareDetails",
          model: "SelfCare",
        });
    } catch (error) {
      throw error;
    }
  }

  async GetProducts() {
    try {
      return await ProductModel.find().select("image price discount title");
    } catch (error) {
      throw error;
    }
  }

  async GetProductsBasedOnCatId(catId: string) {
    try {
      return await ProductModel.find({ catId }).select(
        "image _id price discount title"
      );
    } catch (error) {
      throw error;
    }
  }

  async IncrementClickByOne(productId: string, target: string) {
    try {
      const targetField = target === "clickCount" ? "clickCount" : "orderCount";
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

  async AddShoppingId(shoppingId: string, productId: string) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) throw new Error();
      product.shippingDatails = shoppingId;
      return await product.save();
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
                { $multiply: ["$orderCount", 0.7] },
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
