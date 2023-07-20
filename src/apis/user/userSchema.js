import Joi from 'joi';

const createUser = () => Joi.object().keys({
  first_name: Joi.string().required().label('First Name'),
  last_name: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string().required().label('Phone'),
});

const getUsers = () => Joi.object().keys({
  search_by: Joi.string().allow('').label('Search By'),
  page_no: Joi.number().required().label('Page Number'),
  items_per_page: Joi.number().required().label('Items per page'),
  options: Joi.object({
    sort: Joi.object().keys({
      order: Joi.number().allow('').valid(1, -1).label('Sort Order'),
      field: Joi.string().allow('').valid('first_name', 'email').label('Sort Field'),
    }).required(''),
  }).required(),
});

export {
  createUser,
  getUsers,
}