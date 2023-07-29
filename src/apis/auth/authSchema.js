import Joi from 'joi';

const login = () => Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

export default login;
