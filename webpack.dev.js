const { merge } = require('webpack-merge');
const path = require("path");
const process = require("process")

const common = require('./webpack.common.js');

process.env.PUBLIC_URL = JSON.stringify("localhost:4000")
process.env.PORT = 80;

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: process.env.PORT || 80,
        historyApiFallback: true,
    },
});