import jwt from 'jsonwebtoken';
import config from 'config';
import { defaultReject } from '#helpers/responseHelper';

const auth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return defaultReject({ message: 'NoAuthorisationToken', code: 422 }, res);
  }

  try {
    jwt.verify(authorization, config.jwt_secret);
  } catch (err) {
    return defaultReject({ message: 'Unauthorized', code: 401 }, res);
  }
  next();
};

export default auth;
