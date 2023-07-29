import Joi from 'joi';

const createJob = () => Joi.object().keys({
  title: Joi.string().required().label('Title'),
  department: Joi.string().required().label('Department'),
});

const getJobs = () => Joi.object().keys({
  search_by: Joi.string().allow('').label('Search By'),
  page_no: Joi.number().required().label('Page Number'),
  items_per_page: Joi.number().required().label('Items per page'),
  options: Joi.object({
    sort: Joi.object().keys({
      order: Joi.number().allow('').valid(1, -1).label('Sort Order'),
      field: Joi.string().allow('').valid('title').label('Sort Field'),
    }).required(''),
  }).required(),
});

export {
  createJob,
  getJobs,
};
