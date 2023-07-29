import { JobModel } from '#models/index';
import { createJob, getJobs } from '../jobService';

const mockJob = {
  title: 'Software Engineer',
  department: 'IT',
};

const mockJobRes = {
  title: 'Software Engineer',
  department: 'IT',
};

describe('Job Service', () => {
  it('Should validate job exits', async () => {
    jest.spyOn(JobModel, 'findOne').mockResolvedValueOnce(mockJobRes);

    const res = await createJob(mockJob);

    expect(res.message).toEqual('JobAlreadyExists');
  });

  it('Should create new job', async () => {
    jest.spyOn(JobModel, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(JobModel, 'create').mockResolvedValueOnce(mockJob);

    const res = await createJob(mockJob);

    expect(res.message).toEqual('JobCreatedSuccessfully');
  });

  it('Should get all jobs', async () => {
    await getJobs();
  });
});
