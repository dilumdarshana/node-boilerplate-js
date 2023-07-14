/**
 * Base controller
 */
import { defaultReject, defaultResolve } from '#helpers/responseHelper';

/**
 *
 * @param {*} req Http request
 * @param {*} res Http response
 * @param {*} params Additional parameters
 * @returns
 */
const controller = async (req, res, params) => {
  const resolve = params.resolve || defaultResolve;
  const reject = params.reject || defaultReject;

  try {
    const attributes = params.validator ? await params.validator(req.body) : {};

    if (req.cookies) {
      attributes.cookies = req.cookies;
    }
    if (req.headers) {
      attributes.headers = req.headers;
    }
    if (req.query) {
      attributes.query = req.query;
    }
    if (req.params) {
      attributes.params = req.params;
    }
    if (req.body) {
      attributes.body = req.body;
    }

    const data = await params.service(attributes);

    return resolve(res, data);
  } catch (err) {
    return reject(err, res, req);
  }
};

export default controller;
