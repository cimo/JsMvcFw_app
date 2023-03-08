const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Path = require("path");
const Fs = require("fs");

// Source
const { checkEnvVariable } = require("jsmvcfw/dist/");

const ENV_NAME = checkEnvVariable("ENV_NAME", process.env.ENV_NAME);

require("dotenv").config({ path: `./env/${ENV_NAME}.env` });

checkEnvVariable("DOMAIN", process.env.DOMAIN);
const DEBUG = checkEnvVariable("DEBUG", process.env.DEBUG);
const PORT_HTTPS = checkEnvVariable("NODEJS_PORT_HTTPS", process.env.NODEJS_PORT_HTTPS);
const NODE_ENV = checkEnvVariable("NODE_ENV", process.env.NODEJS_ENV);
const PUBLIC_PATH = checkEnvVariable("PUBLIC_PATH", process.env.PUBLIC_PATH);

process.env["IGNORE_MOBX_MINIFY_WARNING"] = DEBUG;

module.exports = {
    watchOptions: {
        ignored: "**/node_modules",
        poll: true
    },
    devtool: "cheap-module-source-map",
    devServer: {
        port: PORT_HTTPS,
        historyApiFallback: true,
        static: "public",
        hot: true,
        https: true,
        https: {
            key: Fs.readFileSync("/home/root/certificate/tls.key"),
            cert: Fs.readFileSync("/home/root/certificate/tls.crt")
        }
    },
    mode: NODE_ENV,
    entry: "./src/index.ts",
    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve(__dirname, "dist"),
        publicPath: PUBLIC_PATH
    },
    performance: {
        hints: false
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /src/,
                exclude: /node_modules/,
                parallel: 4,
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true,
                    module: false
                }
            })
        ]
    },
    resolve: {
        extensions: [".ts", ".js"],
        alias: {
            "@": Path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                include: /src/,
                loader: "ts-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            title: "Javascript mvc framework",
            publicPath: PUBLIC_PATH
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./public/css/", to: "./css/" },
                { from: "./public/font/", to: "./font/" },
                { from: "./public/image/", to: "./image/" }
            ]
        }),
        new CleanWebpackPlugin({
            compress: {
                warnings: false
            }
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
