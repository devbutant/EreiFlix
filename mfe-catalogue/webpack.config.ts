import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import * as webpack from "webpack";
import "webpack-dev-server";

const config: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    mode: "development",
    devServer: {
        port: 3001,
        historyApiFallback: true,
        hot: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [
        new webpack.container.ModuleFederationPlugin({
            name: "mfe_catalogue",
            filename: "remoteEntry.js",
            exposes: {
                "./Catalogue": "./src/components/Catalogue.tsx",
            },
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                    requiredVersion: "18.0.0",
                },
                "react-dom": {
                    singleton: true,
                    eager: true,
                    requiredVersion: "18.0.0",
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

export default config;
