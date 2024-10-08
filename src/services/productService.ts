import ProductRepository from "../repositories/productRepo";

class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  async CreateProductService(input: IncomingProductData) {
    return await this.repository.CreateProduct(input);
  }

  async GetProductById(productId: string) {
    const product = await this.repository.GetProductById(productId);
    if (!product) throw new Error();
    return await this.repository.IncrementClickByOne(productId, "clickCount");
  }

  async GetProductsByCatIdService(catId: string) {
    return await this.repository.GetProductsBasedOnCatId(catId);
  }

  async UpdateProductService(input: ProductDocs) {
    return await this.repository.UpdateProduct(input);
  }

  async DeleteProductService(productId: string) {
    return await this.repository.DeleteProduct(productId);
  }

  async GetPopularProducts() {
    return await this.repository.GetPopularProducts();
  }

  async GetDiscountProducts() {
    return await this.repository.GetDiscountProducts();
  }
}

export default ProductService;
