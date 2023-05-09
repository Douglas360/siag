import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import multer from 'multer';

interface FileObject {
  originalname: string;
  buffer: Buffer;
}

export const uploadFile = async (file: FileObject): Promise<string | Error> => {
  const s3 = new S3Client({
    // Configure your AWS credentials and region
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  
  const randomName = crypto.randomBytes(16).toString('hex');
  const newFileName = `${randomName}-${file.originalname}`;

  const folderName = 'document';

  const uploadParams = {
    Bucket: 'siag.com.br',
    Key: `${folderName}/${newFileName}`,
    Body: file.buffer,
    ACL: 'public-read',
  };

  try {
    await s3.send(new PutObjectCommand(uploadParams));
    const fileUrl = `http://siag.com.br.s3-website-us-east-1.amazonaws.com/${folderName}/${newFileName}`;
    return fileUrl;
  } catch (error) {
    console.log(error);
    return new Error('Failed to upload the file to S3');
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
