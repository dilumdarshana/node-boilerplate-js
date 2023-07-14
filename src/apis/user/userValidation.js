import { clean, validate } from '#helpers/validationHelper';
import { createUser as createUserSchema } from '#apis/user/userSchema';

const createUser = async (params) => {
  const attributes = clean(params);

  return validate(attributes, createUserSchema);
};

export {
  createUser,
};
