/* eslint-disable no-use-before-define */
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: path.resolve(__dirname, '../src/style/variable.scss')
          //   }
          // }
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 1024 * 5 },
        },
        generator: {
          filename: 'font/[name]_[hash:8][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 1024 * 5 },
        },
        generator: {
          filename: 'images/[name]_[hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],

  cache: {
    type: 'filesystem', // 使用文件缓存
  },
};
