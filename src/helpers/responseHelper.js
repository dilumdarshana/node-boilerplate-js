import { boom } from '#helpers/errorHelper';

/**
 * @param {Object} error - Application Error
 * @param {*} response - Response object
 * @returns Reject Response with Error Object
 */
const defaultReject = async (error, response) => {
  const boomError = boom({
    message: error.message,
    statusCode: error.code,
  }).payload;

  const errorResponse = {
    ...boomError,
    stackTrace: error.stack,
  };

  response.status(boomError.statusCode).json(boomError);

  // only 500 errors are unknown error which needs to be reported
  // other errors are handled
  if (boomError.statusCode >= 500) {
    console.error('API error', errorResponse);
  }
};

/**
 * @param {*} response - Response Object
 * @param {Object} data - Returned Data object
 * @returns Resolved Response with Data
 */
const defaultResolve = async (response, data) => {
  response.status(200).json(data);
};

const createResponse = (message, statusCode, data) => ({
  message,
  statusCode,
  data,
});

const createErrorResponse = (message, statusCode) => ({
  message,
  statusCode,
});

export {
  defaultReject,
  defaultResolve,
  createResponse,
  createErrorResponse,
};
