import { IncomingMessage, ServerResponse } from "http";
import CategoryService from "../services/categoryService";
import IOTools from "../tools/requestTools";
import ValidateIncomingData from "../tools/validateIncomingData";
import { errorHandler } from "../tools/customErrors";

const service = new CategoryService();
const ioTools = new IOTools();
const validate = new ValidateIncomingData();

const categoryHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  GET: async (req, res) => {
    try {
      if (req.url?.includes("?")) {
        const productId = ioTools.handlerQuery(req, "id");
        ioTools.handleResponse(
          res,
          200,
          await service.GetCategoryByIdService(productId || "")
        );
      } else {
        ioTools.handleResponse(
          res,
          200,
          await service.GetAllCategoriesService()
        );
      }
    } catch (error) {
      errorHandler(error, res);
    }
  },
  POST: async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const category = JSON.parse(body);
        const validData = validate.validateCategory(category);
        if (validData) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify(validData, null, 2));
        } else {
          ioTools.handleResponse(
            res,
            201,
            await service.CreateCategoryService(category)
          );
        }
      } catch (error) {
        errorHandler(error, res);
      }
    });

    req.on("error", (error) => {
      errorHandler(error, res);
    });
  },
  PUT: async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const category = JSON.parse(body);
        ioTools.handleResponse(
          res,
          201,
          await service.UpdateCategoryService(category)
        );
      } catch (error) {
        errorHandler(error, res);
      }
    });

    req.on("error", (error) => {
      errorHandler(error, res);
    });
  },
  DELETE: async (req, res) => {
    try {
      const id = ioTools.handlerQuery(req, "id");
      ioTools.handleResponse(
        res,
        200,
        await service.DeleteCategoryService(id || "")
      );
    } catch (error) {
      errorHandler(error, res);
    }
  },
};

export default categoryHandler;
