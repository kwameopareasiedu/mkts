/* This modules installs a complete client+server app basis at the project directory */
module.exports = async (projectName: string, packageManager: string): Promise<void> => {
    const { resolve } = require("path");
    const { renderFile } = require("ejs");
    const { prompt } = require("inquirer");
    const { writeFileSync, mkdirSync } = require("fs");
    const { bold, red, bgRed, green, cyan } = require("chalk");
    const packageInstaller = require("./package-installer");
    const { destroyDirectory } = require("./utils");

    const projectPath = resolve(process.cwd(), projectName);
    const data = { projectName };

    // Enumerate the template files
    const templateFiles = [
        { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js"), data },
        { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc"), data },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data },
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data },
        { source: "knexfile.js.ejs", target: resolve(projectPath, "knexfile.js"), data },
        { source: "nodemon.json.ejs", target: resolve(projectPath, "nodemon.json"), data },
        { source: "nodemon-template.json.ejs", target: resolve(projectPath, "nodemon-template.json"), data },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data },
        { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data },
        { source: "webpack.lb.js.ejs", target: resolve(projectPath, "webpack.lib.js"), data },

        { source: "dist/client/public/index.ejs", target: resolve(projectPath, "dist/client/public/index.ejs"), data },

        { source: "src/client/common/stylesheets/config.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/config.scss"), data },
        { source: "src/client/common/stylesheets/index.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/index.scss"), data },
        { source: "src/client/common/stylesheets/status.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/status.scss"), data },
        { source: "src/client/common/stylesheets/utils.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/utils.scss"), data },
        { source: "src/client/common/index.ts.ejs", target: resolve(projectPath, "src/client/common/index.ts"), data },
        { source: "src/client/public/home/index.tsx.ejs", target: resolve(projectPath, "src/client/public/home/index.tsx"), data },
        { source: "src/client/public/home/index.scss.ejs", target: resolve(projectPath, "src/client/public/home/index.scss"), data },
        { source: "src/client/public/app.tsx.ejs", target: resolve(projectPath, "src/client/public/app.tsx"), data },
        { source: "src/client/public/index.tsx.ejs", target: resolve(projectPath, "src/client/public/index.tsx"), data },
        { source: "src/client/.eslintrc.ejs", target: resolve(projectPath, "src/client/.eslintrc"), data },
        { source: "src/client/tsconfig.json.ejs", target: resolve(projectPath, "src/client/tsconfig.json"), data },

        { source: "src/server/models/config.ts.ejs", target: resolve(projectPath, "src/server/models/config.ts"), data },
        { source: "src/server/models/root.ts.ejs", target: resolve(projectPath, "src/server/models/root.ts"), data },
        { source: "src/server/models/user.ts.ejs", target: resolve(projectPath, "src/server/models/user.ts"), data },
        { source: "src/server/routes/index.ts.ejs", target: resolve(projectPath, "src/server/routes/index.ts"), data },
        { source: "src/server/services/jwt/decrypt.ts.ejs", target: resolve(projectPath, "src/server/services/jwt/decrypt.ts"), data },
        { source: "src/server/services/jwt/encrypt.ts.ejs", target: resolve(projectPath, "src/server/services/jwt/encrypt.ts"), data },
        { source: "src/server/services/jwt/index.ts.ejs", target: resolve(projectPath, "src/server/services/jwt/index.ts"), data },
        { source: "src/server/services/storage/config.ts.ejs", target: resolve(projectPath, "src/server/services/storage/config.ts"), data },
        { source: "src/server/services/storage/basic.ts.ejs", target: resolve(projectPath, "src/server/services/storage/basic.ts"), data },
        { source: "src/server/services/storage/index.ts.ejs", target: resolve(projectPath, "src/server/services/storage/index.ts"), data },
        { source: "src/server/services/index.ts.ejs", target: resolve(projectPath, "src/server/services/index.ts"), data },
        { source: "src/server/app.ts.ejs", target: resolve(projectPath, "src/server/app.ts"), data },
        { source: "src/server/knexfile.js.ejs", target: resolve(projectPath, "src/server/knexfile.js"), data },
        { source: "src/server/utils.ts.ejs", target: resolve(projectPath, "src/server/utils.ts"), data }
    ];

    console.log(cyan("Copying template files..."));

    // Create necessary sub directories
    mkdirSync(resolve(projectPath, "dist"));
    mkdirSync(resolve(projectPath, "dist/client"));
    mkdirSync(resolve(projectPath, "dist/client/public"));
    mkdirSync(resolve(projectPath, "src"));
    mkdirSync(resolve(projectPath, "src/client"));
    mkdirSync(resolve(projectPath, "src/client/common"));
    mkdirSync(resolve(projectPath, "src/client/common/stylesheets"));
    mkdirSync(resolve(projectPath, "src/client/public"));
    mkdirSync(resolve(projectPath, "src/client/public/home"));
    mkdirSync(resolve(projectPath, "src/server/models"));
    mkdirSync(resolve(projectPath, "src/server/routes"));
    mkdirSync(resolve(projectPath, "src/server/services"));
    mkdirSync(resolve(projectPath, "src/server/services/jwt"));
    mkdirSync(resolve(projectPath, "src/server/services/storage"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve("../", "templates", "frontend-backend", source), data || {}, {});
        writeFileSync(target, content);
    }

    console.log(green("Copied template files!\n"));

    while (true) {
        try {
            // Install dependencies
            console.log(cyan("Installing dependencies..."));
            packageInstaller(projectPath, packageManager, [
                "aws-sdk",
                "axios",
                "bcryptjs",
                "connect-redis",
                "cookie-parser",
                "csurf",
                "debug",
                "ejs",
                "express",
                "express-favicon",
                "express-session",
                "express-validator",
                "helmet",
                "http-errors",
                "jsonwebtoken",
                "knex",
                "moment",
                "morgan",
                "multer",
                "multer-s3",
                "numeral",
                "objection",
                "pg",
                "redis",
                "uuid",
                "validator"
            ]);
            console.log(green("Installed dependencies!\n"));

            // Install development dependencies
            console.log(cyan("Installing development dependencies..."));
            packageInstaller(
                projectPath,
                packageManager,
                [
                    "@babel/core",
                    "@babel/plugin-transform-spread",
                    "@babel/preset-env",
                    "@types/connect-redis",
                    "@types/cookie-parser",
                    "@types/csurf",
                    "@types/debug",
                    "@types/express",
                    "@types/express-session",
                    "@types/jsonwebtoken",
                    "@types/morgan",
                    "@types/pg",
                    "@types/react",
                    "@types/react-dom",
                    "@types/react-router-dom",
                    "@types/redis",
                    "@types/validator",
                    "@types/yup",
                    "@typescript-eslint/eslint-plugin",
                    "@typescript-eslint/parser",
                    "autoprefixer",
                    "babel-loader",
                    "concurrently",
                    "css-loader",
                    "eslint",
                    "eslint-config-defaults",
                    "eslint-plugin-react",
                    "faker",
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
                    "webpack@4.44.2",
                    "webpack-cli",
                    "yup"
                ],
                true
            );
            console.log(green("Installed development dependencies!\n"));
            console.log(green("Project setup complete!\n"));

            // TODO: Link to site for next steps and project directory description
            break;
        } catch (err) {
            console.log(err.message);

            const answers = await prompt([
                { name: "retry", message: "An error occurred while installing dependencies. Would you like to try again?", type: "confirm" }
            ]);

            if (!answers.retry) {
                console.log(red("Could not install dependencies. Please rerun ") + bgRed(bold("mkts")) + red(" to try again"));
                destroyDirectory(projectPath);
                break;
            }
        }
    }
};
