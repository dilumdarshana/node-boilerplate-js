import { clean, validate } from '#helpers/validationHelper';
import {
  createUser as createUserSchema,
  getUsers as getUsersSchema,
} from '#apis/user/userSchema';

const createUser = async (params) => {
  const attributes = clean(params);

  return validate(attributes, createUserSchema);
};

const getUsers = async (params) => {
  const attributes = clean(params);

  return validate(attributes, getUsersSchema);
};


export {
  createUser,
  getUsers,
};
