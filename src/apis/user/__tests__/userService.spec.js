import { createUser } from '../userService.js';
import { UserModel } from '#models/index';

const mockUser = {
  firstName: 'Apache',
  lastName: 'Linux',
  email: 'test@gmail.com',
  phone: '1234',
};

const mockUserRes = {
  first_name: 'Apache',
  last_name: 'Linux',
  email: 'test@gmail.com',
  phone: '1234',
}

describe('User Service', () => {
  it('Should validate email exits', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(mockUserRes);

    const res = await createUser(mockUser);

    expect(res.message).toEqual('UserAlreadyExists');
  });

  it('Should create new user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(UserModel, 'create').mockResolvedValueOnce(mockUser);

    const res = await createUser(mockUser);

    expect(res.message).toEqual('UserCreatedSuccessfully');
  });
});
