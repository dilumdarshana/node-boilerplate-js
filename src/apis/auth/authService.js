import jwt from 'jsonwebtoken';
import config from 'config';
import { createResponse, createErrorResponse } from '#helpers/responseHelper';

const login = (data) => {
  try {
    const { email, password } = data;
    const token = jwt.sign({ email, password }, config.jwt_secret, { expiresIn: 86400 });

    return createResponse('LoggedSuccessfully', 200, { token });
  } catch (err) {
    console.log('Error on login', err);
    createErrorResponse('UnknownError', 500);
  }
};

export default login;
