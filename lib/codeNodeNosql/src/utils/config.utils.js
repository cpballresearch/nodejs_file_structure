import 'dotenv/config';

export const developmentDB = {
    database: process.env.DEV_DB_NAME,
    uri:process.env.DEV_DB_URI,
};
export const productionDB = {
    database: process.env.PROD_DB_NAME,
    uri:process.env.PROD_DB_URI,
};
export const emailConfig = {
    MAIL_DRIVER: process.env.MAIL_DRIVER,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
export const cloudBucketConfig = {
    endPoint: process.env.CLOUD_ENDPOINT,
    port: parseInt(process.env.CLOUD_PORT),
    useSSL: process.env.CLOUD_USE_SSL === 'true',
    accessKey: process.env.CLOUD_ACCESS_KEY,
    secretKey: process.env.CLOUD_SECRET_KEY,
    bucketName: process.env.CLOUD_BUCKET_NAME,
};
export const fileUploadSettings = {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE),
    allowedExtensions: process.env.ALLOWED_EXTENSIONS.split(","),
};
