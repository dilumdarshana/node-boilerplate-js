import login from '../authService';

const mockLoginReq = {
  email: 'test@gmail.com',
  password: '1234',
};

describe('Auth Service', () => {
  it('Should login successfully', async () => {
    const res = await login(mockLoginReq);

    expect(res.message).toEqual('LoggedSuccessfully');
    expect(res.statusCode).toEqual(200);
    expect(res.data.token).not.toEqual(null);
  });
});
