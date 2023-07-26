module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: ['prettier', 'jest'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['#root/*', '.'],
          ['#src/*', './src'],
          ['#middlewares', './src/middlewares'],
          ['#apis', './src/apis'],
          ['#utils', './src/utils'],
          ['#models', './src/models'],
          ['#core', './src/core'],
          ['#helpers', './src/helpers'],
        ],
        extensions: ['.js', '.json'],
      },
    },
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'max-len': ['error', { code: 200 }],
    quotes: [2, 'single', 'avoid-escape'],
    camelcase: 'warn',
    'no-case-declarations': 'warn',
    'no-console': 'off',
    'no-param-reassign': [2, {
      props: false,
    }],
    'linebreak-style': 0,
    'no-shadow': 'warn',
    'no-await-in-loop': 0,
    'consistent-return': 0,
  },
};
