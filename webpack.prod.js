const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const process = require("process")

process.env.PUBLIC_URL = JSON.stringify(process.env.PUBLIC_URL || "localhost:4000")

module.exports = merge(common, {
    mode: 'production',
});