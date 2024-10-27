import { IncomingMessage, ServerResponse } from "http";

const allowedOrigins = [
  "https://lano2024-0b1bbc3f481c.herokuapp.com",
  "https://lano-admin.vercel.app",
];

export default (req: IncomingMessage, res: ServerResponse) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return true;
  }

  return false;
};
