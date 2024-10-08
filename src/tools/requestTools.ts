import { IncomingMessage, ServerResponse } from "http";
class IOTools {
  handlerQuery(req: IncomingMessage, query: string): string | null {
    const fullUrl = new URL(`http://localhost:5173${req.url}`);
    return fullUrl.searchParams.get(query) || null;
  }

  handleResponse(res: ServerResponse, statusCode: number = 200, data: any) {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data, null, 2));
  }
}

export default IOTools;
