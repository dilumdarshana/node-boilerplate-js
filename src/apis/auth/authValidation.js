import { clean, validate } from '#helpers/validationHelper';
import loginSchema from '#apis/auth/authSchema';

const login = async (params) => {
  const attributes = clean(params);

  return validate(attributes, loginSchema);
};

export default login;
