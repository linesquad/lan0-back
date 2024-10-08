import { createServer, IncomingMessage, ServerResponse } from "http";
import config from "./config";
import { connectToDb } from "./tools/dbConnection";
import { notFoundHandler, rootHandler } from "./handlers/rootHandler";

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

connectToDb();

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
