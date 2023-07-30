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

const mockGetAllJobsReq = {
  search_by: '',
  page_no: 1,
  items_per_page: 10,
  options: {
    sort: {
      field: 'title',
      order: 1,
    },
  },
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
    jest.spyOn(JobModel, 'aggregate').mockResolvedValueOnce([]);
    jest.spyOn(JobModel, 'aggregate').mockResolvedValueOnce([{}]);

    const res = await getJobs(mockGetAllJobsReq);

    expect(res.message).toEqual('JobsFetchedSuccessfully');
    expect(res.statusCode).toEqual(200);
    expect(res.data).toMatchObject({
      total: 0, items_per_page: 10, page_no: 1, jobs: [{}],
    });
  });
});
