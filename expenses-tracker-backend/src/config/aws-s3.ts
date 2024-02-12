export const AWS_S3_CONFIG_KEY = 'aws-s3';

export type AwsS3Config = {
  bucket: string;
  accessKey: string;
  secretKey: string;
  prefix: string;
  region: string;
};

export const awsS3 = (): {
  [AWS_S3_CONFIG_KEY]: AwsS3Config;
} => ({
  [AWS_S3_CONFIG_KEY]: {
    bucket: process.env.S3_BUCKET!,
    accessKey: process.env.S3_ACCESS_KEY!,
    secretKey: process.env.S3_SECRET_KEY!,
    prefix: process.env.S3_ENV_PREFIX!,
    region: process.env.S3_REGION!,
  },
});
