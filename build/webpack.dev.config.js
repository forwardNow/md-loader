const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'eval-source-map',

  entry: {
    main: path.resolve(__dirname, '../test/main.dev.js'),
  },

  output: {
    publicPath: '/',
  },

  devServer: {
    hot: true,
    open: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../test', 'index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'raw-loader',
        ],
      },
    ],
  },
});
