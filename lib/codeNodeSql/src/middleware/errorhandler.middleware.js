<<<<<<< HEAD:lib/code/src/middleware/errorhandler.middleware.js
import { Client as MinioClient } from 'minio';
import { ValidationError } from 'sequelize';
import ApiError from '../utils/apierror.utils.js';
import { cloudBucketConfig } from '../utils/config.utils.js';
=======
import { Client as MinioClient } from "minio";
import { ValidationError } from "sequelize";
import ApiError from "../utils/ApiError.js";
import { cloudBucketConfig } from "../utils/config.js";
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/middleware/errorHandelerMiddleware.js

const bucketClient = new MinioClient(cloudBucketConfig);

const errorHandler = async (err, req, res, next) => {
  if (err instanceof ValidationError) {
    if (req?.uploadedFiles && Object.keys(req?.uploadedFiles).length !== 0) {
      await Promise.all(
        Object.values(req.uploadedFiles).map(async fileDetails => {
          for (const file of fileDetails) {
            await bucketClient.removeObject(
              cloudBucketConfig.bucketName,
              `${file.folderName}/${file.fileName}`
            );
            console.log(`${file.fileName} is deleted.`);
          }
        })
      );
    }

    const errorMessages = err.errors.map(error => error.message);
    const responseError = {
      data: null,
      statusCode: 400,
      status: false,
      message: errorMessages.join(", ")
    };
    return res.status(responseError.statusCode).json(responseError);
  }

  if (err instanceof ApiError) {
<<<<<<< HEAD:lib/code/src/middleware/errorhandler.middleware.js
    if(req?.uploadedFiles && Object.keys(req?.uploadedFiles).length!==0){
      await Promise.all(Object.values(req.uploadedFiles).map(async(fileDetails)=>{
          for(const file of fileDetails){
            await bucketClient.removeObject(cloudBucketConfig.bucketName,`${file.folderName}/${file.fileName}`);
            console.log(`${file.fileName} is deleted.`);
          }
      }));
=======
    if (req?.uploadedFiles && Object.keys(req?.uploadedFiles).length !== 0) {
      await Promise.all(
        Object.values(req.uploadedFiles).map(async fileDetails => {
          for (const file of fileDetails) {
            await bucketClient.removeObject(
              cloudBucketConfig.bucketName,
              `${file.folderName}/${file.fileName}`
            );
            console.log(`${file.fileName} is deleted.`);
          }
        })
      );
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/middleware/errorHandelerMiddleware.js
    }

    const responseError = {
      data: null,
<<<<<<< HEAD:lib/code/src/middleware/errorhandler.middleware.js
      statusCode: err.statusCode||400,
      status: err.status|| false,
      message:err.message || "Bad Request",
=======
      statusCode: 400,
      status: false,
      message: errorMessages.join(", ")
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/middleware/errorHandelerMiddleware.js
    };
    return res.status(responseError.statusCode).json(responseError);
  }
  
  const responseError = {
    data: null,
    statusCode: err.statusCode || 500,
    status: false,
    message: err.message || "Internal Server Error"
  };
  return res.status(responseError.statusCode).json(responseError);
};

export default errorHandler;
