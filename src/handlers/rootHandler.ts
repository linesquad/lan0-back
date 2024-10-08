import { IncomingMessage, ServerResponse } from "http";
import categoryHandler from "./categoryHandler";
import productHandler from "./productHandler";

const rootHandler: {
  [key: string]: (req: IncomingMessage, res: ServerResponse) => void;
} = {
  "/health-checker": (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!\n");
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
  "/product": (req, res) => {
    const { method } = req;
    const handler = productHandler[method || "GET"];

    if (handler) {
      handler(req, res);
    } else {
      notFoundHandler(req, res, "Method");
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
