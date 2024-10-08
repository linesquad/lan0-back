import { IncomingMessage, ServerResponse } from "http";
import CategoryService from "../services/categoryService";
import IOTools from "../tools/requestTools";

const service = new CategoryService();
const ioTools = new IOTools();

const categoryHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  GET: async (req, res) => {
    if (req.url?.includes("?")) {
      const productId = ioTools.handlerQuery(req, "id");
      ioTools.handleResponse(
        res,
        200,
        await service.GetCategoryByIdService(productId || "")
      );
    } else {
      ioTools.handleResponse(res, 200, await service.GetAllCategoriesService());
    }
  },
  POST: async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const category = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.CreateCategoryService(category)
      );
    });
  },
  PUT: async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const category = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.UpdateCategoryService(category)
      );
    });
  },
  DELETE: async (req, res) => {
    const id = ioTools.handlerQuery(req, "id");
    ioTools.handleResponse(
      res,
      200,
      await service.DeleteCategoryService(id || "")
    );
  },
};

export default categoryHandler;
