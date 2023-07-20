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
    const { first_name: firstName, last_name: lastName, email, phone } = data;
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

    // sort order
    if (field !== null && field && order !== null && order) {
      sortCondition = { $sort: { [field]: order } };

      pipelineOptions.push(sortCondition);
    }

    // set limit
    const limit = itemsPerPage || config.settings.default_page_size;

    const skip = (pageNo - 1) * itemsPerPage;

    // fetch list of users
    const users = await UserModel.aggregate([...pipelineOptions, { $skip: skip }, { $limit: limit }]);

    const output = {
      total: 1,
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
