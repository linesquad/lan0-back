import mongoose from "mongoose";
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

    let productData = null;

    if (mealDetails) {
      const meal = await MealModel.create(mealDetails);
      if (!meal) throw new Error("Meal creation failed.");
      productData = { ...input, mealDetails: meal._id };
    } else if (accessoryDetails) {
      const accessory = await AccessoryModel.create(accessoryDetails);
      if (!accessory) throw new Error("Accessory creation failed.");
      productData = { ...input, accessoryDetails: accessory._id };
    } else if (toyDetails) {
      const toy = await ToyModel.create(toyDetails);
      if (!toy) throw new Error("Toy creation failed.");
      productData = { ...input, toyDetails: toy._id };
    } else if (selfCareDetails) {
      const selfCare = await SelfCareModel.create(selfCareDetails);
      if (!selfCare) throw new Error("Self-care creation failed.");
      productData = { ...input, selfCareDetails: selfCare._id };
    } else {
      throw new Error("No product details provided.");
    }

    // Create the final product using the productData
    const entireProduct = await ProductModel.create(productData);
    if (!entireProduct) throw new Error("Product creation failed.");

    return entireProduct;
  }

  async GetProductById(productId: string) {
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
  }

  async GetProducts(page: number = 1, limit: number = 16) {
    const skip = (page - 1) * limit;

    const products = await ProductModel.find()
      .skip(skip)
      .limit(limit)
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
      })
      .lean();

    const lenBtns = Math.ceil((await ProductModel.countDocuments()) / limit);
    return {
      products,
      page,
      lenBtns: lenBtns >= 1 ? lenBtns : null,
    };
  }

  async GetProductsBasedOnCatId(
    catId: string,
    page: number,
    limit: number = 16
  ) {
    const skip = (page - 1) * limit;
    const products = await ProductModel.find({ catId })
      .skip(skip)
      .limit(limit)
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
      })
      .lean();
    const lenBtns = Math.ceil(
      (await ProductModel.countDocuments({ catId })) / limit
    );
    return {
      products,
      page,
      lenBtns: lenBtns >= 1 ? lenBtns : null,
    };
  }

  async IncrementClickByOne(productId: string, target: string) {
    const targetField = target === "clickCount" ? "clickCount" : "orderCount";
    return await ProductModel.findByIdAndUpdate(
      productId,
      { $inc: { [targetField]: 1 } },
      { new: true }
    );
  }

  async UpdateProduct(input: ProductDocs) {
    return await ProductModel.findByIdAndUpdate(input._id, input, {
      new: true,
    });
  }

  async DeleteProduct(productId: string) {
    return await ProductModel.findByIdAndDelete(productId);
  }

  async AddShoppingId(shoppingId: string, productId: string) {
    const product = await ProductModel.findById(productId);
    if (!product) throw new Error();
    product.shippingDatails = shoppingId;
    return await product.save();
  }

  async GetPopularProducts() {
    const products = await ProductModel.aggregate([
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ["$clickCount", 0.3] },
              { $multiply: ["$orderCount", 0.7] },
            ],
          },
        },
      },
      { $sort: { score: -1 } },
      { $limit: 10 },
    ]);

    const populatedProducts = await ProductModel.populate(products, [
      { path: "mealDetails", model: "Meal" },
      { path: "accessoryDetails", model: "Accessory" },
      { path: "toyDetails", model: "Toy" },
      { path: "selfCareDetails", model: "SelfCare" },
    ]);

    return populatedProducts;
  }

  async GetDiscountProducts() {
    return await ProductModel.find({ discount: { $gt: 0 } })
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
      })
      .lean();
  }

  async GetSearchedProduct(searchTerm: string) {
    return await ProductModel.find({
      title: { $regex: searchTerm, $options: "i" },
    })
      .select("_id image title price discount")
      .lean();
  }

  async GetPriceRangedProducts(minPrice: number, maxPrice: number) {
    const minPriceDecimal = mongoose.Types.Decimal128.fromString(
      minPrice.toString()
    );
    const maxPriceDecimal = mongoose.Types.Decimal128.fromString(
      maxPrice.toString()
    );
    return await ProductModel.find({
      price: { $gte: minPriceDecimal, $lte: maxPriceDecimal },
    })
      .select("_id image title price brand discount productType animalType")
      .lean();
  }
}

export default ProductRepository;
