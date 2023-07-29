import jwt from 'jsonwebtoken';
import config from 'config';
import { createErrorResponse, defaultReject } from '#helpers/responseHelper';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return defaultReject({ message: 'NoAuthorisationToken', code: 422 }, res);
  }

  jwt.verify(authorization, config.jwt_secret);

  next();
};
