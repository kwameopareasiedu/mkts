const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        public: "./src/public/index.tsx"
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "[name]/bundle.js"
    },
    module: {
        rules: [
            {
                test: /.tsx?$/,
                exclude: /\node_modules/,
                use: {
                    loader: "ts-loader",
                    options: { transpileOnly: true }
                }
            },
            {
                test: /.jsx?$/,
                exclude: /\node_modules/,
                use: { loader: "babel-loader" }
            },
            {
                test: /\.(scss|css)$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "postcss-loader" }, { loader: "sass-loader" }]
            },
            {
                test: /\.(png|jp(e?)g|gif|svg)$/i,
                use: [{ loader: "url-loader", options: { limit: 4096, name: "/assets/[hash].[ext]" } }]
            },
            {
                test: /\.(mp3|wav|ogg)$/i,
                use: [{ loader: "file-loader", options: { publicPath: "/assets", outputPath: "assets" } }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{ loader: "file-loader" }]
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, "./dist/lib.json")
        })
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
        alias: {
            // react: path.resolve("./node_modules/react"),
            // formik: path.resolve("./node_modules/formik"),
            // "react-router-dom": path.resolve("./node_modules/react-router-dom")
        }
    }
};
