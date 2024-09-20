import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Constants from "../constant.js";
import logger from "../logger.js";
import ResponseEntity from "./ResponseEntity.js";
dotenv.config();

/**
 * Create a response object.
 * @param {Object} data - The data to be included in the response.
 * @param {number} statusCode - The HTTP status code.
 * @param {string} status - The status of the response.
 * @param {string} message - The message to be included in the response.
 * @returns {ResponseEntity} - The response entity object.
 */
const createResponse = (data, statusCode, status, message) => {
  return new ResponseEntity(data, statusCode, status, message);
};

/**
 * Handle server errors.
 * @param {Object} res - The response object.
 * @param {Error} error - The error object.
 * @param {number} [statusCode=500] - The HTTP status code.
 */
const handleServerError = async (
  res,
  error,
  statusCode = Constants.HTTPINTERNALSERVERERROR
) => {
  await logger.error(error);

  const response = createResponse(
    null,
    statusCode,
    Constants.failedStatus,
    error.message
  );

  res.status(500).json(response);
};

/**
 * Handle image not found errors.
 * @param {Object} res - The response object.
 */
const handelImageNotFound = res => {
  const response = createResponse(
    null,
    Constants.errorNoImage,
    Constants.failedStatus,
    Constants.errorNoImage
  );
  logger.writeLog(response);
  res.status(400).json(response);
};

/**
 * Handle successful data creation.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelServerDataCreated = (res, data) => {
  const response = createResponse(
    data,
    Constants.HTTPCREATED,
    Constants.successStatus,
    Constants.dataSave
  );
  res.status(201).json(response);
};

/**
 * Handle successful data retrieval.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelServerDataGet = (res, data) => {
  const response = createResponse(
    data,
    Constants.HTTPOK,
    Constants.successStatus,
    Constants.dataFetch
  );
  res.status(200).json(response);
};

/**
 * Handle email existence error.
 * @param {Object} res - The response object.
 * @param {Object} data - The data to be included in the response.
 */
const handelExistEmail = (res, data) => {
  const response = createResponse(
    data,
    Constants.HTTPNOCONTENT,
    Constants.failedStatus,
    Constants.existEmail
  );
  res.status(204).json(response);
};

/**
 * Handle data not found.
 * @param {Object} res - The response object.
 */
const handelDataNotFound = res => {
  const response = createResponse(
    null,
    Constants.HTTPNOCONTENT,
    Constants.failedStatus,
    Constants.dataNotFound
  );
  res.status(204).json(response);
};

/**
 * Handle successful custom response.
 * @param {Object} res - The response object.
 * @param {string} message - The message to be included in the response.
 */
const handelServerSuccess = (res, data, message) => {
  const response = createResponse(
    data,
    Constants.HTTPOK,
    Constants.successStatus,
    message
  );
  res.status(200).json(response);
};

/**
 * Handle login responses with JWT token.
 * @param {Object} res - The response object.
 * @param {Object} user - The user object.
 */
const handelLogin = (res, user) => {
  //* Here You Can Store The User Data in The Token But This is Not Preferable User Express Session TO Store the data
  // const users = {
  //     userId: user?.id,
  //     email: user?.email,
  // };
  // const authToken = jwt.sign(users, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });
  const users = {
    userId: user?.id
  };
  const authToken = jwt.sign(users, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d"
  });

  const response = createResponse(
    { authToken, user },
    Constants.HTTPOK,
    Constants.successStatus,
    Constants.loginSuccess
  );
  res.status(200).json(response);
};

/**
 * Handle unauthorized access.
 * @param {Object} res - The response object.
 */
const handelUnauthorized = res => {
  const response = createResponse(
    null,
    Constants.UNAUTHORIZED,
    Constants.failedStatus,
    Constants.unauthorized
  );
  res.status(401).json(response);
};

/**
 * Handle invalid email errors.
 * @param {Object} res - The response object.
 */
const handelInvalidEmail = res => {
  const response = createResponse(
    null,
    Constants.HTTPBADREQUEST,
    Constants.failedStatus,
    Constants.invalidEmail
  );
  res.status(400).json(response);
};

/**
 * Handle unverified email errors.
 * @param {Object} res - The response object.
 */
const handelUnverifyEmail = res => {
  const response = createResponse(
    null,
    Constants.HTTPBADREQUEST,
    Constants.failedStatus,
    Constants.emailVerificationFailed
  );
  res.status(400).json(response);
};

/**
 * Handle data deletion.
 * @param {Object} res - The response object.
 */
const handelDataDelete = res => {
  const response = createResponse(
    null,
    Constants.HTTPNOCONTENT,
    Constants.successStatus,
    Constants.dataDelete
  );
  res.status(204).json(response);
};

/**
 * Handle data update.
 * @param {Object} res - The response object.
 */
const handelDataUpdate = res => {
  const response = createResponse(
    null,
    Constants.HTTPOK,
    Constants.successStatus,
    Constants.dataUpdateSuccess
  );
  res.status(200).json(response);
};

/**
 * Handle unique constraint errors.
 * @param {Object} res - The response object.
 * @param {string} unique - The unique constraint field.
 */
const handelDataUnique = (res, unique) => {
  const response = createResponse(
    null,
    Constants.INTERNAL_SERVER_ERROR,
    Constants.failedStatus,
    `${unique} must be unique`
  );
  res.status(500).json(response);
};

/**
 * Handle invalid data errors.
 * @param {Object} res - The response object.
 */
const handelDataInvalid = res => {
  const response = createResponse(
    null,
    Constants.UNPROCESSABLE_ENTITY,
    Constants.failedStatus,
    Constants.invalidData
  );
  res.status(422).json(response);
};

/**
 * Handle success with a custom message.
 * @param {Object} res - The response object.
 * @param {string} message - The message to be included in the response.
 */
const handleSuccessCustomResponse = (res, message) => {
  const response = createResponse(
    null,
    Constants.HTTPOK,
    Constants.successStatus,
    message
  );
  res.status(200).json(response);
};

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 * @param {number} httpStatusCode - The HTTP status code.
 * @param {string} message - The error message.
 */
const handleCustomErrorResponse = async (res, httpStatusCode, message) => {
  const response = new ResponseEntity(
    null,
    httpStatusCode,
    Constants.failedStatus,
    message
  );
  res.status(httpStatusCode).json(response);
};

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 */
const handelBadRequest = async res => {
  const response = new ResponseEntity(
    null,
    Constants.HTTPBADREQUEST,
    Constants.failedStatus,
    Constants.invalidData
  );
  res.status(200).json(response);
};

/**
 * Handle custom error responses.
 * @param {Object} res - The response object.
 */
const handelTooMayRequest = async res => {
  const response = new ResponseEntity(
    null,
    Constants.HTTPTOOMANYREQUEST,
    Constants.failedStatus,
    Constants.TOOMANYREQUEST
  );
  res.status(200).json(response);
};

//* Export all functions
export {
  createResponse,
  handelBadRequest,
  handelDataDelete,
  handelDataInvalid,
  handelDataNotFound,
  handelDataUnique,
  handelDataUpdate,
  handelExistEmail,
  handelImageNotFound,
  handelInvalidEmail,
  handelLogin,
  handelServerDataCreated,
  handelServerDataGet,
  handelServerSuccess,
  handelTooMayRequest,
  handelUnauthorized,
  handelUnverifyEmail,
  handleCustomErrorResponse,
  handleServerError,
  handleSuccessCustomResponse
};
