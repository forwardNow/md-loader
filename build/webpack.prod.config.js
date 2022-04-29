const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const baseConfig = require('./webpack.base.config');

const isAnalyze = process.env.ANALYZE;

module.exports = merge(baseConfig, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(),

    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  // cache: {
  //   type: 'filesystem',
  //   buildDependencies: {
  //     config: [__filename],
  //   },
  // },
});
