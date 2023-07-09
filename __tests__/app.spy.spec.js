const crypto = require('crypto');
const { getData } = require('../app');

describe('App spy on tests', () => {
  it('Should generate random bytes', async () => {
    jest.spyOn(crypto, 'randomBytes').mockResolvedValueOnce('bytes');

    const data = await getData();

    expect(data).toBe('bytes');
  });
});
