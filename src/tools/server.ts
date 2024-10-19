import { createServer, IncomingMessage, ServerResponse } from "http";
import { notFoundHandler, rootHandler } from "../handlers/rootHandler";
import handleCors from "./handleCors";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const isOptionsHandled = handleCors(req, res);

  // If CORS handler finished the request (for OPTIONS), do nothing further
  if (isOptionsHandled) {
    return;
  }

  const fullUrl = new URL(`http://localhost:5173${req.url}`);
  const { pathname } = fullUrl;

  const handler = rootHandler[pathname];

  if (handler) {
    handler(req, res);
  } else {
    notFoundHandler(req, res);
  }
});

export default server;
