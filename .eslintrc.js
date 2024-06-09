module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': 0,
    'require-jsdoc': 0,
    'indent': ['error', 2],
    'object-curly-spacing': 0,
  },
};
