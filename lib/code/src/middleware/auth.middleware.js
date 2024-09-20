<<<<<<< HEAD:lib/code/src/middleware/auth.middleware.js
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'; //* Import the entire CommonJS module
import {Constants} from '../utils/constant.utils.js';
import logger from '../utils/logger.utils.js';
import { handelUnauthorized, handleServerError } from '../utils/responsehandler/index.utils.js';
=======
import dotenv from "dotenv";
import jwt from "jsonwebtoken"; //* Import the entire CommonJS module
import Constants from "../utils/constant.js";
import logger from "../utils/logger.js";
import {
  handelUnauthorized,
  handleServerError
} from "../utils/responseHandler/index.js";
>>>>>>> b48e342eca147f4fd2daf88fec3c62800a7e3a43:lib/code/src/middleware/authMiddleware.js
dotenv.config();
const { verify } = jwt; //* Destructure the `verify` function from the imported module

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return handelUnauthorized(res);
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      logger.error(err);
      return handleServerError(res, err, Constants.HTTPFORBIDDEN);
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;
