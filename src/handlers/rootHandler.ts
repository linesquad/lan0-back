import { IncomingMessage, ServerResponse } from "http";
import categoryHandler from "./categoryHandler";
import productHandler from "./productHandler";
import IOTools from "../tools/requestTools";
import OrderService from "../services/orderService";
import ValidateIncomingData from "../tools/validateIncomingData";
import { errorHandler } from "../tools/customErrors";
import uploadHandler from "../tools/uploadHandler";
import deleteFile from "../tools/deleteFile";

const ioTools = new IOTools();
const service = new OrderService();
const validate = new ValidateIncomingData();

const rootHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  "/health-checker": async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  },
  "/category": async (req, res) => {
    const { method } = req;
    const handler = categoryHandler[method || "GET"];

    if (handler) {
      handler(req, res);
    } else {
      notFoundHandler(req, res, "Method");
    }
  },
  "/product": async (req, res) => {
    const { method } = req;
    const handler = productHandler[method || "GET"];

    if (handler) {
      handler(req, res);
    } else {
      notFoundHandler(req, res, "Method");
    }
  },
  "/login": async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const validateData = validate.validateShipping(data);
        if (validateData) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify(validateData, null, 2));
        } else {
          ioTools.handleResponse(res, 201, await service.LoginService(data));
        }
      } catch (error) {
        errorHandler(error, res);
      }
    });

    req.on("error", (error) => {
      errorHandler(error, res);
    });
  },
  "/order": async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const { productId } = JSON.parse(body);
        ioTools.handleResponse(
          res,
          201,
          await service.PlaceOrderService(productId)
        );
      } catch (error) {
        errorHandler(error, res);
      }
    });

    req.on("error", (error) => {
      errorHandler(error, res);
    });
  },
  "/upload": async (req, res) => {
    try {
      uploadHandler(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  },
  "/delete-file": async (req, res) => {
    try {
      deleteFile(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  },
};

function notFoundHandler(
  req: IncomingMessage,
  res: ServerResponse,
  target: string = "Route"
) {
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: `${target} Not Found` }));
}

export { rootHandler, notFoundHandler };
