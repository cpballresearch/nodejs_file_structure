import { Sequelize } from 'sequelize';
import logger from '../utils/logger.js';
import initModels from './initModels.js'; // Import the initialization function
//*This is for Production
import { productionDB } from '../utils/config.js';
//*This IS For Development
import { developmentDB } from '../utils/config.js';

const db = productionDB;

//? Initialize Sequelize
const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password,
    {
        host: db.host,
        dialect: db.dialect,
        logging: true
    }
);

//? Initialize models
const models = initModels(sequelize);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); //? Sync all defined models
        logger.info('Database connected and models synchronized successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();

export { models, sequelize };
