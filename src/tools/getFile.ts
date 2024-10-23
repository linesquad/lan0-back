import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { BadRequestError } from "./customErrors";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export const getPreSignedUrl = async (fileName: string): Promise<string> => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
  };

  try {
    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 36000,
    });
    return signedUrl;
  } catch (error) {
    throw new BadRequestError("File is not available.");
  }
};
