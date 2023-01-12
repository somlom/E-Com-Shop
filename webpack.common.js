const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const process = require("process")


module.exports = {
    //# sourceMappingURL=style.css.map
    entry: path.join(__dirname, "src", "index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /api/, /css/],
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                exclude: [/node_modules/],
                use: [MiniCssExtractPlugin.loader, "css-loader",],
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
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
