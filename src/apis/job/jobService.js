import config from 'config';
import { JobModel } from '#models/index';
import { createResponse, createErrorResponse } from '#helpers/responseHelper';
import { purifyStringForRegex } from '#helpers/commonHelper';

/**
 * Create new job
 * @param {*} data job data
 * @returns api status
 */
const createJob = async (data) => {
  try {
    const {
      title, department,
    } = data;

    const jobExists = await JobModel.findOne({ title });

    // check Job already exists
    if (jobExists) {
      return createErrorResponse('JobAlreadyExists', 400);
    }

    const job = {
      title,
      department,
    };

    await JobModel.create(job);

    return createResponse('JobCreatedSuccessfully', 200, {});
  } catch (err) {
    console.log('Error on createJob', err);
  }
};

const getJobs = async (data) => {
  try {
    const {
      search_by: searchBy,
      page_no: pageNo,
      items_per_page: itemsPerPage,
      options: {
        sort: {
          field,
          order,
        },
      },
    } = data;

    const pipelineOptions = [];
    let queryString = {};
    let sortCondition = {};

    // search by term
    if (searchBy !== '') {
      const searchTerm = purifyStringForRegex(searchBy);
      let criteria = '';

      criteria = [
        { title: { $regex: new RegExp(`.*${searchTerm}.*`, 'i') } },
        { department: { $regex: new RegExp(`.*${searchTerm}.*`, 'i') } },
      ];

      queryString = { $match: { $or: criteria } };

      pipelineOptions.push(queryString);
    }

    // sort order
    if (field !== null && field && order !== null && order) {
      sortCondition = { $sort: { [field]: order } };

      pipelineOptions.push(sortCondition);
    }

    // set limit
    const limit = itemsPerPage || config.settings.default_page_size;

    const skip = (pageNo - 1) * itemsPerPage;

    // get total records count
    const totalRecordPromise = JobModel.aggregate([...pipelineOptions]);

    // fetch list of jobs
    const jobsPromise = JobModel.aggregate([...pipelineOptions, { $skip: skip }, { $limit: limit }]);

    const [totalRes, jobs] = await Promise.all([totalRecordPromise, jobsPromise]);

    const output = {
      total: totalRes.length,
      items_per_page: limit,
      page_no: pageNo,
      jobs,
    };

    return createResponse('JobsFetchedSuccessfully', 200, output);
  } catch (err) {
    console.log('Error on getJobs', err);
  }
};

export {
  createJob,
  getJobs,
};
