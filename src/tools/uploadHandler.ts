import { IncomingMessage, ServerResponse } from "http";
import formidable from "formidable";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuid } from "uuid";
import fs from "fs";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export default async (req: IncomingMessage, res: ServerResponse) => {
  const form = formidable({
    maxFileSize: 100 * 1024 * 1024,
    multiples: false,
  });

  form.parse(
    req,
    async (err: any, _fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.writeHead(400, { "Content-type": "application/json" });
        res.end(JSON.stringify({ error: "Form parsing failed" }));
        return;
      }

      const file = files.image;
      if (!file) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "No file uploaded" }));
        return;
      }

      const fileToProcess = Array.isArray(file) ? file[0] : file;

      try {
        const fileStream = fs.createReadStream(fileToProcess.filepath);

        const fileName = `${uuid()}-${fileToProcess.originalFilename}`;

        const upload = new Upload({
          client: s3Client,
          params: {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
            Body: fileStream,
            ContentType: fileToProcess.mimetype || "application/octet-stream",
          },
        });

        const result = await upload.done();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "File uploaded successfully",
            url: result.Location,
            fileName,
          })
        );
      } catch (uploadErr) {
        console.error("Error uploading to S3:", uploadErr);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ error: "S3 upload failed", details: uploadErr })
        );
      }
    }
  );
};
