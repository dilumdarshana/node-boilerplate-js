export default {
  verbose: true,
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.spec.js'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  resetMocks: true,
};
