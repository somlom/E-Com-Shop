const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('dotenv').config()


module.exports = {

    entry: {
        // lodash: {

        // },
        index: {
            import: path.join(__dirname, "src", "index.js"),
            dependOn: 'shared',
        },
        redux: {
            import: path.join(__dirname, "src", "features", "cart_slice.js"),
            dependOn: 'shared',
        },
        redux_api: {
            import: path.join(__dirname, "src", "features", "cart_slice.js"),
            dependOn: 'shared',
        },
        redux_store: {
            import: path.join(__dirname, "src", "store.js"),
            dependOn: 'shared',
        },
        i18n: {
            import: path.join(__dirname, "src", "i18n.js"),
            dependOn: 'shared',
        },
        shared: 'lodash',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /api/, /css/, /test/, /public/,],
                use: ['babel-loader'],
            },
            {
                test: /\.(css)$/,
                exclude: [/node_modules/, /test/, /api/, /test/, /public/, /hooks/, /features/],
                use: [MiniCssExtractPlugin.loader, "css-loader",],
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: 'public/img',
            //                 esModule: false // <- here
            //             }
            //         }
            //     ]

            // }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            process: {
                env: {
                    PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
                    API_URL: JSON.stringify(process.env.API_URL)
                }
            }
        }),
        new HtmlWebpackPlugin({
            title: 'interEcom',
            template: path.join(__dirname, "public", "index.html"),
            favicon: path.join(__dirname, "public", "favicon.ico"),
            scriptLoading: "defer"
        }),
    ],
    optimization: {
        // chunkIds: "total-size",
        usedExports: 'global',
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
    },
}
