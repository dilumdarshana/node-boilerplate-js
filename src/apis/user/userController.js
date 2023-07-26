import {
  createUser as createUserValidator,
  getUsers as getUsersValidator,
} from '#apis/user/userValidation';
import {
  createUser as createUserService,
  getUsers as getUsersService,
} from '#apis/user/userService';
import controller from '#core/controller';

const createUser = (req, res) => controller(req, res, {
  validator: createUserValidator,
  service: createUserService,
});

const getUsers = (req, res) => controller(req, res, {
  validator: getUsersValidator,
  service: getUsersService,
});

export {
  createUser,
  getUsers,
};
