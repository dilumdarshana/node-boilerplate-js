import controller from '#core/controller';
import { createUser as createUserValidator } from '#apis/user/userValidation';
import { createUser as createUserService } from '#apis/user/userService';

const createUser = (req, res) => controller(req, res, {
  validator: createUserValidator,
  service: createUserService,
});

export {
  createUser,
};
