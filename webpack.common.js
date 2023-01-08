const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require("webpack");
const process = require("process")


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
                exclude: [/node_modules/, /api/, /css/],
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss|sass)$/,
                exclude: [/node_modules/],
                use: ["style-loader", "css-loader", "sass-loader",],
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.css'],
    },
    plugins: [
        new DefinePlugin({ 
            'process.env': {
                'PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL || "localhost:4000")
            }
        }),
        new HtmlWebpackPlugin({
            title: 'App',
            publicPath: "/",
            // favicon: path.join(__dirname, "favicon.svg"),
            template: path.join(__dirname, "public", "index.html"),
        }),
    ],
}
