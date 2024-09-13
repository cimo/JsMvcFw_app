const Path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EsLintPlugin = require("eslint-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const checkEnv = (key, value) => {
    // eslint-disable-next-line no-console
    console.log("JsMvcFw.ts - checkEnv", { key, value });

    if (value === undefined) {
        const text = `${key} is not defined!`;

        document.body.innerHTML = text;
        throw new Error(text);
    }

    return value;
};

// Source
//const { checkEnv } = require("@cimo/jsmvcfw/dist");

const ENV_NAME = checkEnv("ENV_NAME", process.env.ENV_NAME);

require("dotenv").config({ path: `./env/${ENV_NAME}.env` });

const DOMAIN = checkEnv("DOMAIN", process.env.DOMAIN);
const TIMEZONE = checkEnv("TIMEZONE", process.env.TIMEZONE);
const JSMVCFW_APP_NAME = checkEnv("JSMVCFW_APP_NAME", process.env.JSMVCFW_APP_NAME);
const JSMVCFW_APP_LABEL = checkEnv("JSMVCFW_APP_LABEL", process.env.JSMVCFW_APP_LABEL);
const JSMVCFW_APP_DEBUG = checkEnv("JSMVCFW_APP_DEBUG", process.env.JSMVCFW_APP_DEBUG);
const JSMVCFW_APP_NODE_ENV = checkEnv("JSMVCFW_APP_NODE_ENV", process.env.JSMVCFW_APP_NODE_ENV);
const JSMVCFW_APP_URL_ROOT = checkEnv("JSMVCFW_APP_URL_ROOT", process.env.JSMVCFW_APP_URL_ROOT);

module.exports = {
    target: "web",
    devtool: "source-map",
    mode: JSMVCFW_APP_NODE_ENV,
    entry: "./src/view/Main.ts",
    output: {
        filename: "main.js",
        sourceMapFilename: "main.js.map",
        path: Path.resolve(__dirname, "public/js"),
        publicPath: JSMVCFW_APP_URL_ROOT
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /(node_modules)/
            }
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: ENV_NAME === "local" ? false : true,
        minimizer: [
            new TerserPlugin({
                exclude: /(node_modules)/,
                parallel: true,
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
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify({
                ENV_NAME,
                DOMAIN,
                TIMEZONE,
                JSMVCFW_APP_NAME,
                JSMVCFW_APP_LABEL,
                JSMVCFW_APP_DEBUG,
                JSMVCFW_APP_NODE_ENV,
                JSMVCFW_APP_URL_ROOT
            })
        }),
        new HtmlWebpackPlugin({
            template: "./template_index.html",
            filename: "../index.html",
            inject: false,
            templateParameters: {
                name: JSMVCFW_APP_NAME,
                urlRoot: JSMVCFW_APP_URL_ROOT
            }
        }),
        new EsLintPlugin({
            extensions: ["ts", "js"],
            exclude: ["node_modules"],
            fix: true
        }),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};
