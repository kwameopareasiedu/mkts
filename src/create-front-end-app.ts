import { createApp } from "./create-app";
import { resolve } from "path";
import { installDependencies } from "./install-dependencies";

export const createFrontEndApp = async (name: string): Promise<void> => {
    await createApp(name, resolve(__dirname, "../templates/front-end"));

    await installDependencies(
        name,
        [
            "axios",
            "connect-redis",
            "cookie-parser",
            "debug",
            "dotenv",
            "ejs",
            "express",
            "express-favicon",
            "express-session",
            "http-errors",
            "moment",
            "morgan",
            "numeral",
            "redis"
        ],
        [
            "@babel/core",
            "@babel/plugin-transform-spread",
            "@babel/preset-env",
            "@types/bcryptjs",
            "@types/connect-redis",
            "@types/cookie-parser",
            "@types/csurf",
            "@types/debug",
            "@types/express",
            "@types/express-session",
            "@types/morgan",
            "@types/node",
            "@types/numeral",
            "@types/react",
            "@types/react-dom",
            "@types/react-router-dom",
            "@types/redis",
            "@types/webpack",
            "@typescript-eslint/eslint-plugin",
            "@typescript-eslint/parser",
            "autoprefixer",
            "babel-loader",
            "concurrently",
            "css-loader",
            "eslint",
            "eslint-config-defaults",
            "eslint-plugin-react",
            "file-loader",
            "formik",
            "node-sass",
            "nodemon",
            "postcss",
            "postcss-loader",
            "prettier",
            "react",
            "react-dom",
            "react-router-dom",
            "react-simple-widgets",
            "sass-loader",
            "style-loader",
            "ts-loader",
            "typescript",
            "url-loader",
            "webpack",
            "webpack-cli",
            "yup"
        ]
    );
};
