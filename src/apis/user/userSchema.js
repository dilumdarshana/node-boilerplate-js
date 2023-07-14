import Joi from 'joi';

const createUser = () => Joi.object().keys({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
});

export {
  createUser,
}