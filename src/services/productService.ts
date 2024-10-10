import { IncomingProductData, ProductDocs } from "../dto/product";
import ProductRepository from "../repositories/productRepo";
import {
  BadRequestError,
  NotFoundError,
  serviceLayerError,
} from "../tools/customErrors";

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProductService(input: IncomingProductData) {
    try {
      const newProduct = await this.repository.CreateProduct(input);
      if (!newProduct)
        throw new BadRequestError(
          "Something went wrong during creating product."
        );

      return newProduct;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetProductById(productId: string) {
    try {
      const product = await this.repository.GetProductById(productId);
      if (!product) throw new NotFoundError("Product not found provided ID.");
      await this.repository.IncrementClickByOne(productId, "clickCount");
      return product;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.GetProducts();
      if (!products) throw new NotFoundError("Products not found");
      return products.map((p) => {
        const price = Number(p.price.toString());
        const currentPrice =
          p.discount > 0 ? price - price / p.discount : price;
        return {
          _id: p._id,
          title: p.title,
          image: p.image,
          price,
          currentPrice: currentPrice.toFixed(2),
        };
      });
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetProductsByCatIdService(catId: string) {
    try {
      const products = await this.repository.GetProductsBasedOnCatId(catId);
      if (!products)
        throw new NotFoundError("Products not found by provided category ID.");
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async UpdateProductService(input: ProductDocs) {
    try {
      const updatedProduct = await this.repository.UpdateProduct(input);
      if (!updatedProduct)
        throw new BadRequestError("Error while product updated process.");
      return updatedProduct;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async DeleteProductService(productId: string) {
    try {
      const removedProduct = await this.repository.DeleteProduct(productId);
      if (!removedProduct)
        throw new NotFoundError("Product not found by provided ID");

      return true;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetPopularProducts() {
    try {
      return await this.repository.GetPopularProducts();
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetDiscountProducts() {
    try {
      return await this.repository.GetDiscountProducts();
    } catch (error) {
      serviceLayerError(error);
    }
  }
}

export default ProductService;
