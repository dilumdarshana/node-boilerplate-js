import { clean, validate } from '#helpers/validationHelper';
import {
  createJob as createJobSchema,
  getJobs as getJobsSchema,
} from '#apis/job/jobSchema';

const createJob = async (params) => {
  const attributes = clean(params);

  return validate(attributes, createJobSchema);
};

const getJobs = async (params) => {
  const attributes = clean(params);

  return validate(attributes, getJobsSchema);
};

export {
  createJob,
  getJobs,
};
