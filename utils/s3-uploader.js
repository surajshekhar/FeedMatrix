import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY,
  },
});

export const uploadMultipleFilesToS3 = async (files = []) => {
  const uploadedUrls = [];

  for (let file of files) {
    const fileName = `${Date.now()}-${uuidv4()}-${file.originalname}`;

    const uploadParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
      Metadata: {
        fieldName: file.fieldname,
      },
    };

    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);

    const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    uploadedUrls.push(fileUrl);
  }

  return uploadedUrls;
};
