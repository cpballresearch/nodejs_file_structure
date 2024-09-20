import { cloudBucketConfig } from './config.utils.js';
import { Client as MinioClient } from 'minio'; 
const bucketClient = new MinioClient(cloudBucketConfig);

export const deletefileFromMinio=async(folderName, fileName)=> {
    console.log("in delete minio ",folderName, fileName);
    await bucketClient.removeObject(cloudBucketConfig.bucketName,`${folderName}/${fileName}`);
    console.log("one file deleted");
}