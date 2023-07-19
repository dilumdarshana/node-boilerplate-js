import Joi from 'joi';

const createUser = () => Joi.object().keys({
  first_name: Joi.string().required().label('First Name'),
  last_name: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
});

const getUsers = () => Joi.object().keys({
  search_by: Joi.string().optional().label('Search By'),
  page_no: Joi.number().optional().label('Page Number'),
  items_per_page: Joi.number().optional().label('Items per page'),
});

export {
  createUser,
  getUsers,
}