import { IncomingProductData, ProductDocs } from "../dto/product";
import ProductRepository from "../repositories/productRepo";
import {
  BadRequestError,
  NotFoundError,
  serviceLayerError,
} from "../tools/customErrors";
import { getPreSignedUrl } from "../tools/getFile";

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
      const preSignedUrl = await getPreSignedUrl(product.image);
      return { ...product, imgUrl: preSignedUrl };
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetProducts(page: number) {
    try {
      const products = await this.repository.GetProducts(page);

      if (!products || products.products.length === 0) {
        throw new NotFoundError("Products not found");
      }
      const { lenBtns } = products;
      const enhancedProducts = await Promise.all(
        products.products.map(async (p) => {
          try {
            const preSignedUrl = await getPreSignedUrl(p.image);
            return { ...p, imgUrl: preSignedUrl };
          } catch (error) {
            return { ...p, imgUrl: null };
          }
        })
      );

      return { products: enhancedProducts, lenBtns, page };
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
      const { lenBtns } = products;
      const enhancedProducts = await Promise.all(
        products.products.map(async (p) => {
          try {
            const preSignedUrl = await getPreSignedUrl(p.image);
            return { ...p, imgUrl: preSignedUrl };
          } catch (error) {
            return { ...p, imgUrl: null };
          }
        })
      );

      return { products: enhancedProducts, lenBtns, page };
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async UpdateProductService(input: ProductDocs) {
    try {
      const updatedProduct = await this.repository.UpdateProduct(input);
      if (!updatedProduct)
        throw new BadRequestError("Error while product updated process.");
      const preSignedUrl = await getPreSignedUrl(updatedProduct.image);
      return { ...updatedProduct, imgUrl: preSignedUrl };
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
      const products = await this.repository.GetPopularProducts();
      return await Promise.all(
        products.map(async (p) => {
          const preSignedUrl = await getPreSignedUrl(p.image);
          return { ...p, imgUrl: preSignedUrl };
        })
      );
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetDiscountProducts() {
    try {
      const products = await this.repository.GetDiscountProducts();
      return await Promise.all(
        products.map(async (p) => {
          const preSignedUrl = await getPreSignedUrl(p.image);
          return { ...p, imgUrl: preSignedUrl };
        })
      );
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetSearchedProductService(searchTerm: string) {
    try {
      const products = await this.repository.GetSearchedProduct(searchTerm);
      return await Promise.all(
        products.map(async (p) => {
          const preSignedUrl = await getPreSignedUrl(p.image);
          return { ...p, imgUrl: preSignedUrl };
        })
      );
    } catch (error) {
      serviceLayerError(error);
    }
  }

  async GetPriceRangedProductsService(minPrice: string, maxPrice: string) {
    try {
      const products = await this.repository.GetPriceRangedProducts(
        Number(minPrice),
        Number(maxPrice)
      );

      return await Promise.all(
        products.map(async (p) => {
          const preSignedUrl = await getPreSignedUrl(p.image);
          return { ...p, imgUrl: preSignedUrl };
        })
      );
    } catch (error) {
      serviceLayerError(error);
    }
  }
}

export default ProductService;
