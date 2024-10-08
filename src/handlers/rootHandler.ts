import { IncomingMessage, ServerResponse } from "http";
import categoryHandler from "./categoryHandler";
import productHandler from "./productHandler";
import IOTools from "../tools/requestTools";
import OrderService from "../services/orderService";

const ioTools = new IOTools();
const service = new OrderService();
const rootHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  "/health-checker": async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  },
  "/category": (req, res) => {
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
  "/create-shopping": async (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const data = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.CreateShippingService(data)
      );
    });
  },
  "/order": (req, res) => {
    let body: string = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const { productId } = JSON.parse(body);
      ioTools.handleResponse(
        res,
        201,
        await service.PlaceOrderService(productId)
      );
    });
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
