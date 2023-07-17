import { UserModel } from '#models/index';
import { createResponse, createErrorResponse } from '#helpers/responseHelper';

const createUser = async (data) => {
  try {
    const { firstName, lastName, email, phone } = data;
    const customerExists = await UserModel.findOne({ email });

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

export {
  createUser,
};
