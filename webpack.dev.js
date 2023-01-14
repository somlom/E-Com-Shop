const { merge } = require('webpack-merge');
const path = require("path");
const process = require("process")

const common = require('./webpack.common.js');


process.env.PORT = 3000;
process.env.PUBLIC_URL = "http://localhost:3000",
process.env.API_URL = "http://localhost:4000",

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: process.env.PORT || 3000,
        historyApiFallback: true,
    },
});