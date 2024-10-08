import { ServerResponse } from "http";
import { IncomingMessage } from "http";
import IOTools from "../tools/requestTools";
import ProductService from "../services/productService";
import { notFoundHandler } from "./rootHandler";

const ioTools = new IOTools();
const service = new ProductService();
const productHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  GET: async (req, res) => {
    if (req.url?.includes("?")) {
      const query = req.url.split("?")[1];
      switch (query.split("=")[0]) {
        case "catId":
          ioTools.handleResponse(
            res,
            200,
            await service.GetProductsByCatIdService(query.split("=")[1])
          );
          break;
        case "productId":
          ioTools.handleResponse(res, 200, await service.GetProductById(query.split("=")[1]));
          break;
        case "popular":
          ioTools.handleResponse(res, 200, await service.GetPopularProducts());
          break;
        case "discount":
          ioTools.handleResponse(res, 200, await service.GetDiscountProducts());
          break;
      }
    }
  },
  POST: async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const data = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.CreateProductService(data)
      );
    });
  },
  PUT: (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const data = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.UpdateProductService(data)
      );
    });
  },
  DELETE: async (req, res) => {
    const query = ioTools.handlerQuery(req, "productId");
    if (query) {
      ioTools.handleResponse(
        res,
        200,
        await service.DeleteProductService(query)
      );
    } else {
      notFoundHandler(req, res, "Method");
    }
  },
};

export default productHandler;
