import { IncomingMessage, ServerResponse } from "http";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { errorHandler } from "./customErrors";
import IOTools from "./requestTools";
import { notFoundHandler } from "../handlers/rootHandler";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});
const ioTools = new IOTools();

export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "DELETE") {
    const query = ioTools.handlerQuery(req, "fileName") || "";
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: query,
    };

    try {
      const command = new DeleteObjectCommand(params);
      await s3Client.send(command);
      res.writeHead(201, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Successfully removed: " + query }));
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    notFoundHandler(req, res);
  }
};
