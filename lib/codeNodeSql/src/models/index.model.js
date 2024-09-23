import { Sequelize } from 'sequelize';
import logger from '../utils/logger.utils.js';
import initModels from './initmodels.model.js'; // Import the initialization function
//*This is for Production and developement
import { productionDB,developmentDB } from '../utils/config.utils.js';

const db = process.env.NODE_ENV==='production'?productionDB:developmentDB;

// ? Initialize Sequelize
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
  logging: true
});

// ? Initialize models
const models = initModels(sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // ? Sync all defined models
    logger.info("Database connected and models synchronized successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

export { models, sequelize };
