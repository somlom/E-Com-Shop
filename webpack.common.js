const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: [/node_modules/, /api/],
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            publicPath: "/",
            // favicon: path.join(__dirname, "favicon.svg"),
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
}