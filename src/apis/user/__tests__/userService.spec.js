import { UserModel } from '#models/index';
import { createUser, getUsers } from '../userService';

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
};

const mockGetAllUsersReq = {
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

  it('Should get all users', async () => {
    jest.spyOn(UserModel, 'aggregate').mockResolvedValueOnce([]);
    jest.spyOn(UserModel, 'aggregate').mockResolvedValueOnce([{}]);

    const res = await getUsers(mockGetAllUsersReq);

    expect(res.message).toEqual('UsersFetchedSuccessfully');
    expect(res.statusCode).toEqual(200);
    expect(res.data).toMatchObject({
      total: 0, items_per_page: 10, page_no: 1, users: [{}],
    });
  });
});
