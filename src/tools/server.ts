import { createServer, IncomingMessage, ServerResponse } from "http";
import { notFoundHandler, rootHandler } from "../handlers/rootHandler";

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
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
