const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {DefinePlugin} = require('webpack');
require('dotenv').config({path: '../.env'});
const website_config = require('./config.json');

module.exports = {
  entry: {
    index: {
      import: path.join(__dirname, 'src', 'index.js'),
      dependOn: 'shared',
    },
    redux: {
      import: path.join(__dirname, 'src', 'features', 'cart_slice.js'),
      dependOn: 'shared',
    },
    redux_api: {
      import: path.join(__dirname, 'src', 'features', 'cart_api.js'),
      dependOn: 'shared',
    },
    redux_store: {
      import: path.join(__dirname, 'src', 'store.js'),
      dependOn: 'shared',
    },
    i18n: {
      import: path.join(__dirname, 'src', 'i18n.js'),
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /api/, /css/, /test/, /public/],
        use: ['babel-loader'],
      },
      {
        test: /\.(sass|scss|css)$/,
        exclude: [
          /node_modules/,
          /test/,
          /api/,
          /test/,
          /public/,
          /hooks/,
          /features/,
        ],
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|pdf|flow)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      title: website_config.website_name,
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
      scriptLoading: 'defer',
    }),
  ],
  optimization: {
    chunkIds: 'total-size',
    usedExports: 'global',
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
  },
};
