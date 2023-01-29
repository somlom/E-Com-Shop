const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
require('dotenv').config()


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
        // publicPath: 'auto',
        publicPath: "/",
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
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'public/img',
                            esModule: false // <- here
                        }
                    }
                ]

            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new DefinePlugin({
            process: {
                env: {
                    MONGO_URL: JSON.stringify(process.env.MONGO_URL),
                    TEST_API: JSON.stringify(process.env.TEST_API),

                    EMAIL: JSON.stringify(process.env.EMAIL),
                    EMAIL_PASSWORD: JSON.stringify(process.env.EMAIL_PASSWORD),

                    STRIPE_PUBLIC: JSON.stringify(process.env.STRIPE_PUBLIC),
                    STRIPE_SECRET: JSON.stringify(process.env.STRIPE_SECRET),
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
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: 'single',
    },
}
