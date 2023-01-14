const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { DefinePlugin } = require("webpack");
const { EnvironmentPlugin } = require('webpack');
const Dotenv = require("dotenv-webpack");


module.exports = {
    //# sourceMappingURL=style.css.map
    entry: {
        index: {
            import: path.join(__dirname, "src", "index.js"),
            dependOn: 'shared',
        },
        another: {
            import: path.join(__dirname, "src", "lodash.js"),
            dependOn: 'shared',
        },
        shared: 'lodash',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /api/, /css/, /test/],
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                exclude: [/node_modules/, /test/],
                use: [MiniCssExtractPlugin.loader, "css-loader",],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        // new EnvironmentPlugin(
        //     Object.keys(process.env).filter((key) => key.startsWith('WEBPACK_DEMO_'))
        //     ),
        new Dotenv({
            systemvars: true,
            path: `./.env`
        }),
        new HtmlWebpackPlugin({
            title: 'App',
            publicPath: "/",
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, "public", "favicon.ico"),
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
}
