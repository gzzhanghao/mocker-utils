module.exports = {

  extends: [
    'eslint:recommended',
  ],

  env: {
    node: true,
    es6: true,
  },

  parser: 'babel-eslint',

  rules: {
    'indent': [2, 2, { SwitchCase: 1 }],
    'comma-dangle': [2, 'only-multiline'],
  },
}
