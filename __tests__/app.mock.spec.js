const crypto = require('crypto');
const { getData } = require('../server');

jest.mock('crypto');

describe('App mock tests', () => {
  it('Should generate random bytes', async () => {
    crypto.randomBytes.mockResolvedValueOnce('bytes');

    const data = await getData();

    expect(data).toBe('bytes');
  });
});
