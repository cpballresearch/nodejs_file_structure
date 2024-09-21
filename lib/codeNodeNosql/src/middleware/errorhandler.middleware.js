import { Client as MinioClient } from 'minio';
import {Error} from 'mongoose';
import ApiError from '../utils/apierror.utils.js';
import { cloudBucketConfig } from '../utils/config.utils.js';
import { Constants } from '../utils/constant.utils.js';

const bucketClient = new MinioClient(cloudBucketConfig);

const errorHandler = async (err, req, res, next) => {
  if (err instanceof Error.ValidationError) {
    if(req?.uploadedFiles && Object.keys(req?.uploadedFiles).length!==0){
      await Promise.all(Object.values(req.uploadedFiles).map(async(fileDetails)=>{
          for(const file of fileDetails){
            await bucketClient.removeObject(cloudBucketConfig.bucketName,`${file.folderName}/${file.fileName}`);
            console.log(`${file.fileName} is deleted.`);
          }
      }));
    }

    const errorMessages = Object.values(err.errors).map(error => error.message);
    const responseError = {
      data: null,
      statusCode: 400,
      status: false,
      message: errorMessages.join(', '),
    };
    return res.status(responseError.statusCode).json(responseError);
  }

  if (err instanceof ApiError) {
    if(req?.uploadedFiles && Object.keys(req?.uploadedFiles).length!==0){
      await Promise.all(Object.values(req.uploadedFiles).map(async(fileDetails)=>{
          for(const file of fileDetails){
            await bucketClient.removeObject(cloudBucketConfig.bucketName,`${file.folderName}/${file.fileName}`);
            console.log(`${file.fileName} is deleted.`);
          }
      }));
    }

    const responseError = {
      data: null,
      statusCode: err.statusCode||400,
      status: err.status|| false,
      message:err.message || Constants.BAD_REQUEST_ERROR_MESSAGE,
    };
    return res.status(responseError.statusCode).json(responseError);
  }

  const responseError = {
    data: null,
    statusCode: err.statusCode || 500,
    status: false,
    message: err.message || Constants.INTERNALSERVERERROR_MESSAGE,
  };
  return res.status(responseError.statusCode).json(responseError);
};

export default errorHandler;