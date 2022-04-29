module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:vue/recommended',
  ],

  settings: {
    'import/resolver': {
      // https://github.com/benmosher/eslint-plugin-import/issues/1396
      [require.resolve('eslint-import-resolver-node')]: {},
      [require.resolve('eslint-import-resolver-webpack')]: {
        config: require.resolve('./build/webpack.base.config.js'),
      },
    },
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
    ],
  },

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },

  rules: {
    complexity: [
      'error',
      {
        max: 15,
      },
    ],

    'import/no-extraneous-dependencies': 'off',
    'vue/no-unused-components': 'off',
  },
};
