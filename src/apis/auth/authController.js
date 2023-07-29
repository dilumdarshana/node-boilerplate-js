import controller from '#core/controller';
import loginValidator from '#apis/auth/authValidation';
import loginService from '#apis/auth/authService';

const login = (req, res) => controller(req, res, {
  validator: loginValidator,
  service: loginService,
});

export default login;
