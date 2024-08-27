import { Client as MinioClient } from 'minio';
import { ValidationError } from 'sequelize';
import ApiError from '../utils/ApiError.js';
import { cloudBucketConfig } from '../utils/config.js';

const bucketClient = new MinioClient(cloudBucketConfig);

const errorHandler = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    if (req?.uploadedFiles && Object.keys(req?.uploadedFiles).length !== 0) {
      await Promise.all(Object.values(req.uploadedFiles).map(async (fileDetails) => {
        for (const file of fileDetails) {
          await bucketClient.removeObject(cloudBucketConfig.bucketName, `${file.folderName}/${file.fileName}`);
          console.log(`${file.fileName} is deleted.`);
        }
      }));
    }

    const errorMessages = err.errors.map(error => error.message);
    const responseError = {
      data: null,
      statusCode: 400,
      status: false,
      message: errorMessages.join(', '),
    };
    return res.status(responseError.statusCode).json(responseError);
  }

  if (err instanceof ApiError) {
    if (req?.uploadedFiles && Object.keys(req?.uploadedFiles).length !== 0) {
      await Promise.all(Object.values(req.uploadedFiles).map(async (fileDetails) => {
        for (const file of fileDetails) {
          await bucketClient.removeObject(cloudBucketConfig.bucketName, `${file.folderName}/${file.fileName}`);
          console.log(`${file.fileName} is deleted.`);
        }
      }));
    }

    const errorMessages = err.errors.map(error => error.message);
    const responseError = {
      data: null,
      statusCode: 400,
      status: false,
      message: errorMessages.join(', '),
    };
    return res.status(responseError.statusCode).json(responseError);
  }

  const responseError = {
    data: null,
    statusCode: err.statusCode || 500,
    status: false,
    message: err.message || 'Internal Server Error',
  };
  return res.status(responseError.statusCode).json(responseError);
};

export default errorHandler;
