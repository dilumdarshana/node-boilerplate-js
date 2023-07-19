import { UserModel } from '#models/index';
import { createResponse, createErrorResponse } from '#helpers/responseHelper';

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

const getUsers = async (data) => {console.log('data', data)
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
console.log('p'. process.env.default_page_size)
    const limit = itemsPerPage || '';

    const users = await UserModel.find({}, 'first_name last_name email phone');

    return createResponse('UsersFetchedSuccessfully', 200, users);
  } catch (err) {
    console.log('Error on getUsers', err);
  }
};

export {
  createUser,
  getUsers,
};
