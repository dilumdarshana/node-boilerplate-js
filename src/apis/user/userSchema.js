import Joi from 'joi';

const createUser = () => Joi.object().keys({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
});

export {
  createUser,
}