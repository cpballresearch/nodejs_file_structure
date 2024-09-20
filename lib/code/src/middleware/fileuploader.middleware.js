import { cloudBucketConfig, fileUploadSettings } from '../utils/config.utils.js';

import { Client as MinioClient } from 'minio';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { handleCustomErrorResponse } from '../utils/responsehandler/index.utils.js';
import {Constants} from '../utils/constant.utils.js';


const bucketClient = new MinioClient(cloudBucketConfig);

const uploadFunction = async (bucketName, folderName, file, metaData) => {
    const uniqueFileName = `${uuidv4()}_${file.originalname.replace(/\s+/g, '_')}`;
    try {
        await bucketClient.putObject(bucketName, `${folderName}/${uniqueFileName}`, file.buffer, metaData);
        return uniqueFileName;
    } catch (error) {
        await bucketClient.removeObject(bucketName, `${folderName}/${uniqueFileName}`);
        throw new Error(error.message);
    }
};

// File upload function
const fileUpload = (fieldNameDetails = [{ name: "image", maxCount: 10, folderName: "images", isOptional: false }]) => {
    const storage = multer.memoryStorage();
    const upload = multer({
        storage,
        limits: { fileSize: fileUploadSettings.maxFileSize || Infinity },
        fileFilter: (req, file, cb) => {
            const extname = path.extname(file.originalname).toLowerCase();
            if (fileUploadSettings.allowedExtensions.length === 0 || fileUploadSettings.allowedExtensions.includes(extname)) {
                cb(null, true);
            } else {
                cb(new multer.MulterError('LIMIT_UNSUPPORTED_FILE_TYPE', file.fieldname), false);
            }
        },
    }).fields(fieldNameDetails.map(field => ({ name: field.name })));

    return async (req, res, next) => {
        upload(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                const errorMessages = {
                    "LIMIT_FILE_SIZE": `The file you uploaded for ${error?.field} exceeds the maximum allowed size of ${fileUploadSettings.maxFileSize / (1024 * 1024)} MB. Please choose a smaller file.`,
                    "LIMIT_UNSUPPORTED_FILE_TYPE": `Invalid file type for ${error?.field}. Only ${fileUploadSettings.allowedExtensions.join(', ')} are allowed.`,
                };
                await handleCustomErrorResponse(res, Constants.HTTPBADREQUEST, errorMessages[error.code] || "File upload error");
                return;
            } else if (error) {
                await handleCustomErrorResponse(res, Constants.HTTPINTERNALSERVERERROR, "Unknown error");
                return;
            }

            try {
                const files = req.files;
                const missingRequiredFields = fieldNameDetails.filter(field => !field.isOptional && (!files || !files[field.name]));

                if (missingRequiredFields.length > 0) {
                    const missingFieldNames = missingRequiredFields.map(field => field.name).join(', ');
                    await handleCustomErrorResponse(res, Constants.HTTPBADREQUEST, `Required fields missing: ${missingFieldNames}`);
                    return;
                }

                let uploadedFiles = {};
                let exceedSizeFields = [];

                await Promise.all(fieldNameDetails.map(async (field) => {
                    const filesDetails = files?.[field.name];
                    if (filesDetails) {
                        if (filesDetails.length > field.maxCount) {
                            exceedSizeFields.push(field.name);
                        } else {
                            uploadedFiles[field.name] = [];
                            await Promise.all(filesDetails.map(async (file) => {
                                const metaData = { 'Content-type': file.mimetype };
                                const uniqueFileName = await uploadFunction(cloudBucketConfig.bucketName, field.folderName, file, metaData);
                                uploadedFiles[field.name].push({ fileName: uniqueFileName, folderName: field.folderName });
                            }));
                        }
                    }
                }));

                if (exceedSizeFields.length > 0) {
                    const exceedFieldNames = exceedSizeFields.join(', ');
                    await handleCustomErrorResponse(res, Constants.HTTPBADREQUEST, `File count exceeded for fields: ${exceedFieldNames}`);
                    return;
                }

                req.uploadedFiles = uploadedFiles;
                next();
            } catch (err) {
                await handleCustomErrorResponse(res, Constants.HTTPINTERNALSERVERERROR, err.message);
            }
        });
    };
};

export default fileUpload;
