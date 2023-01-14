const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const process = require("process")

process.env.API_URL = "http://192.168.178.54:4000"
process.env.PUBLIC_URL = "http://192.168.178.54:3000"

console.log(process.env.API_URL)

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
});