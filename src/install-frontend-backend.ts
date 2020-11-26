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
    const sessionSecret = require("randomstring").generate({ length: 48 });
    const data = { projectName, sessionSecret };

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
        { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js"), data },

        { source: "dist/client/public/index.ejs", target: resolve(projectPath, "dist/client/public/index.ejs"), data },

        { source: "src/client/common/stylesheets/config.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/config.scss"), data },
        { source: "src/client/common/stylesheets/index.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/index.scss"), data },
        { source: "src/client/common/stylesheets/status.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/status.scss"), data },
        { source: "src/client/common/stylesheets/utils.scss.ejs", target: resolve(projectPath, "src/client/common/stylesheets/utils.scss"), data },
        { source: "src/client/common/index.ts.ejs", target: resolve(projectPath, "src/client/common/index.ts"), data },
        { source: "src/client/common/utils.tsx.ejs", target: resolve(projectPath, "src/client/common/utils.tsx"), data },
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
    mkdirSync(resolve(projectPath, "src/server"));
    mkdirSync(resolve(projectPath, "src/server/models"));
    mkdirSync(resolve(projectPath, "src/server/routes"));
    mkdirSync(resolve(projectPath, "src/server/services"));
    mkdirSync(resolve(projectPath, "src/server/services/jwt"));
    mkdirSync(resolve(projectPath, "src/server/services/storage"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve(__dirname, "../", "templates", "frontend-backend", source), data || {}, {});
        writeFileSync(target, content);
    }

    console.log(green("Copied template files!\n"));

    while (true) {
        try {
            // Install dependencies
            console.log(cyan("Installing dependencies..."));
            packageInstaller(projectPath, packageManager, [
                "aws-sdk@^2.x.x",
                "axios@^0.x.x",
                "bcryptjs@^2.x.x",
                "connect-redis@^5.x.x",
                "cookie-parser@^1.x.x",
                "csurf@^1.x.x",
                "debug@^4.x.x",
                "ejs@^3.x.x",
                "express@^4.x.x",
                "express-favicon@^2.x.x",
                "express-session@^1.x.x",
                "express-validator@^6.x.x",
                "helmet@^4.x.x",
                "http-errors@^1.x.x",
                "jsonwebtoken@^8.x.x",
                "knex@^0.x.x",
                "moment@^2.x.x",
                "morgan@^1.x.x",
                "multer@^1.x.x",
                "multer-s3@^2.x.x",
                "numeral@^2.x.x",
                "objection@^2.x.x",
                "pg@^8.x.x",
                "redis@^3.x.x",
                "uuid@^8.x.x",
                "validator@^13.x.x"
            ]);
            console.log(green("Installed dependencies!\n"));

            // Install development dependencies
            console.log(cyan("Installing development dependencies..."));
            packageInstaller(
                projectPath,
                packageManager,
                [
                    "@babel/core@^7.x.x",
                    "@babel/plugin-transform-spread@^7.x.x",
                    "@babel/preset-env@^7.x.x",
                    "@types/connect-redis@^0.x.x",
                    "@types/cookie-parser@^1.x.x",
                    "@types/csurf@^1.x.x",
                    "@types/debug@^4.x.x",
                    "@types/express@^4.x.x",
                    "@types/express-session@^1.x.x",
                    "@types/jsonwebtoken@^8.x.x",
                    "@types/morgan@^1.x.x",
                    "@types/pg@^7.x.x",
                    "@types/react@^17.x.x",
                    "@types/react-dom@^17.x.x",
                    "@types/react-router-dom@^5.x.x",
                    "@types/redis@^2.x.x",
                    "@types/validator@^13.x.x",
                    "@types/yup@^0.x.x",
                    "@typescript-eslint/eslint-plugin@^4.x.x",
                    "@typescript-eslint/parser@^4.x.x",
                    "autoprefixer@^10.x.x",
                    "babel-loader@^8.x.x",
                    "concurrently@^5.x.x",
                    "css-loader@^5.x.x",
                    "eslint@^7.x.x",
                    "eslint-config-defaults@^9.x.x",
                    "eslint-plugin-react@^7.x.x",
                    "faker@^5.x.x",
                    "file-loader@^6.x.x",
                    "formik@^2.x.x",
                    "node-sass@^5.x.x",
                    "nodemon@^2.x.x",
                    "postcss@^8.x.x",
                    "postcss-loader@^4.x.x",
                    "prettier@^2.x.x",
                    "react@^16.x.x",
                    "react-dom@^16.x.x",
                    "react-router-dom@^5.x.x",
                    "react-simple-widgets@^3.x.x",
                    "sass-loader@^10.x.x",
                    "style-loader@^2.x.x",
                    "ts-loader@^8.x.x",
                    "typescript@^4.x.x",
                    "url-loader@^4.x.x",
                    "webpack@5.x.x",
                    "webpack-cli@^4.x.x",
                    "yup@^0.x.x"
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
