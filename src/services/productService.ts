import { IncomingProductData, ProductDocs } from "../dto/product";
import ProductRepository from "../repositories/productRepo";
import {
  BadRequestError,
  NotFoundError,
  serviceLayerError,
} from "../tools/customErrors";
import discountLogic from "../tools/discountLogic";

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

  async GetProducts(page: number) {
    try {
      const products = await this.repository.GetProducts(page);
      if (!products) throw new NotFoundError("Products not found");
      return products;
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetProductsByCatIdService(catId: string, page: number) {
    try {
      const products = await this.repository.GetProductsBasedOnCatId(
        catId,
        page
      );
      if (!products)
        throw new NotFoundError("Products not found by provided category ID.");
      return products;
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
