/* eslint-disable */
'use strict';

module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'flowtype'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/flowtype',
    'prettier/react'
  ],
  globals: {
    __DEV__: true
  },
  rules: {
    'prettier/prettier': ['error', { printWidth: 110, singleQuote: true }],
    'react/jsx-no-bind': 'off',
    'no-invalid-this': 'off',
    'consistent-return': 'off',
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'react/no-typos': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.ejs'] }],
    'react/prop-types': [2, { ignore: ['style', 'children', 'dispatch'] }],
    'react/prefer-stateless-function': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['external', ['builtin', 'internal'], 'parent', 'sibling', 'index']
      }
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/named': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'import/no-absolute-path': 'error',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'react/destructuring-assignment': 'off',
    'import/no-cycle': 'off',
    'react/button-has-type': 'off',
    'react/no-access-state-in-setstate': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  }
};
