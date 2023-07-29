import config from 'config';
import { UserModel } from '#models/index';
import { createResponse, createErrorResponse } from '#helpers/responseHelper';
import { purifyStringForRegex } from '#helpers/commonHelper';

/**
 * Create new user
 * @param {*} data user data
 * @returns api status
 */
const createUser = async (data) => {
  try {
    const {
      first_name: firstName, last_name: lastName, email, phone, job,
    } = data;
    const customerExists = await UserModel.findOne({ email });

    // check user already exists
    if (customerExists) {
      return createErrorResponse('UserAlreadyExists', 400);
    }

    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      job,
    };

    await UserModel.create(user);

    return createResponse('UserCreatedSuccessfully', 200, {});
  } catch (err) {
    console.log('Error on createUser', err);
  }
};

const getUsers = async (data) => {
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
        { first_name: { $regex: new RegExp(`.*${searchTerm}.*`, 'i') } },
        { last_name: { $regex: new RegExp(`.*${searchTerm}.*`, 'i') } },
        { email: { $regex: new RegExp(`.*${searchTerm}.*`, 'i') } },
      ];

      queryString = { $match: { $or: criteria } };

      pipelineOptions.push(queryString);
    }

    // relate with jobs collection
    const customerJob = {
      $lookup: {
        from: 'job',
        localField: 'job',
        foreignField: '_id',
        as: 'job',
      },
    };

    pipelineOptions.push(customerJob);

    // sort order
    if (field !== null && field && order !== null && order) {
      sortCondition = { $sort: { [field]: order } };

      pipelineOptions.push(sortCondition);
    }

    pipelineOptions.push({
      $project: {
        _id: 0,
        first_name: 1,
        last_name: 1,
        email: 1,
        phone: 1,
        job: 1,
      },
    });

    // set limit
    const limit = itemsPerPage || config.settings.default_page_size;

    const skip = (pageNo - 1) * itemsPerPage;

    // get total records count
    const totalRecordPromise = UserModel.aggregate([...pipelineOptions]);

    // fetch list of users
    const usersPromise = UserModel.aggregate([...pipelineOptions, { $skip: skip }, { $limit: limit }]);

    const [totalRes, users] = await Promise.all([totalRecordPromise, usersPromise]);

    const output = {
      total: totalRes.length,
      items_per_page: limit,
      page_no: pageNo,
      users,
    };

    return createResponse('UsersFetchedSuccessfully', 200, output);
  } catch (err) {
    console.log('Error on getUsers', err);
  }
};

export {
  createUser,
  getUsers,
};
