import mongoose from 'mongoose';
import logger from '../utils/logger.utils.js';
import initModels from './initmodels.model.js'; // Import the initialization function
import { productionDB,developmentDB } from '../utils/config.utils.js';

const db = process.env.NODE_ENV==='production'?productionDB:developmentDB;

//? Initialize models
// let models; 

// (async () => {
//     try {
//         const connection=await mongoose.connect(db.uri,{
//             dbName:db.database,
//             maxPoolSize:1
//         });
//         models= initModels(mongoose);
//         logger.info(`MongoDB connected in ${connection.connection.port} port and models initialized successfully.`);
//     } catch (error) {
//         logger.error('Unable to connect to the database:', error);
//     }
// })();

const models=await (async(mongoose)=>{
    try {
        const connection=await mongoose.connect(db.uri,{
            dbName:db.database,
            maxPoolSize:1
        });
        logger.info(`MongoDB connected in ${connection.connection.port} port and models initialized successfully.`);
        const initializedModels=initModels(connection);
        return initializedModels;
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
    
    
})(mongoose);

export { models };
