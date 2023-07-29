import {
  createJob as createJobValidator,
  getJobs as getJobsValidator,
} from '#apis/job/jobValidation';
import {
  createJob as createJobService,
  getJobs as getJobsService,
} from '#apis/job/jobService';
import controller from '#core/controller';

const createJob = (req, res) => controller(req, res, {
  validator: createJobValidator,
  service: createJobService,
});

const getJobs = (req, res) => controller(req, res, {
  validator: getJobsValidator,
  service: getJobsService,
});

export {
  createJob,
  getJobs,
};
