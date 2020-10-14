/* This modules installs a frontend server app basis at the project directory */
module.exports = async (projectName: string, packageManager: string): Promise<void> => {
    const { resolve } = require("path");
    const { renderFile } = require("ejs");
    const { prompt } = require("inquirer");
    const { writeFileSync, mkdirSync } = require("fs");
    const { bold, red, bgRed, green, cyan } = require("chalk");
    const packageInstaller = require("./package-installer");
    const { destroyDirectory } = require("./utils");

    const projectPath = resolve(process.cwd(), projectName);

    // Enumerate the template files
    const templateFiles = [
        { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js"), data: { projectName } },
        { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc"), data: { projectName } },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data: { projectName } },
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data: { projectName } },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data: { projectName } },
        { source: "nodemon.json.ejs", target: resolve(projectPath, "nodemon.json"), data: { projectName } },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: { projectName } },
        { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data: { projectName } },
        { source: "server.js.ejs", target: resolve(projectPath, "server.js"), data: { projectName } },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data: { projectName } },
        { source: "types.ts.ejs", target: resolve(projectPath, "types.ts"), data: { projectName } },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data: { projectName } },
        { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js"), data: { projectName } },
        { source: "dist/public/index.ejs", target: resolve(projectPath, "dist/public/index.html"), data: { projectName } },
        {
            source: "src/common/stylesheets/config.scss.ejs",
            target: resolve(projectPath, "src/common/stylesheets/config.scss"),
            data: { projectName }
        },
        { source: "src/common/stylesheets/index.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/index.scss"), data: { projectName } },
        {
            source: "src/common/stylesheets/status.scss.ejs",
            target: resolve(projectPath, "src/common/stylesheets/status.scss"),
            data: { projectName }
        },
        { source: "src/common/stylesheets/utils.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/utils.scss"), data: { projectName } },
        { source: "src/common/index.ts.ejs", target: resolve(projectPath, "src/common/index.ts"), data: { projectName } },
        { source: "src/common/utils.tsx.ejs", target: resolve(projectPath, "src/common/utils.tsx"), data: { projectName } },
        { source: "src/public/login/index.tsx.ejs", target: resolve(projectPath, "src/public/login/index.tsx"), data: { projectName } },
        { source: "src/public/login/index.scss.ejs", target: resolve(projectPath, "src/public/login/index.scss"), data: { projectName } },
        { source: "src/public/logout/index.tsx.ejs", target: resolve(projectPath, "src/public/logout/index.tsx"), data: { projectName } },
        { source: "src/public/app.tsx.ejs", target: resolve(projectPath, "src/public/app.tsx"), data: { projectName } },
        { source: "src/public/index.tsx.ejs", target: resolve(projectPath, "src/public/index.tsx"), data: { projectName } }
    ];

    console.log(cyan("Copying template files..."));

    // Create necessary sub directories
    mkdirSync(resolve(projectPath, "dist"));
    mkdirSync(resolve(projectPath, "dist/public"));
    mkdirSync(resolve(projectPath, "dist/lib"));
    mkdirSync(resolve(projectPath, "src"));
    mkdirSync(resolve(projectPath, "src/common"));
    mkdirSync(resolve(projectPath, "src/common/stylesheets"));
    mkdirSync(resolve(projectPath, "src/public"));
    mkdirSync(resolve(projectPath, "src/public/login"));
    mkdirSync(resolve(projectPath, "src/public/logout"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve("../", "templates", "frontend-server", source), data || {}, {});
        writeFileSync(target, content);
    }

    console.log(green("Copied template files!\n"));

    console.log(cyan("Installing dependencies..."));

    while (true) {
        try {
            // Install dependencies
            packageInstaller(projectPath, packageManager, ["cookie-parser", "debug", "express", "express-session", "morgan"]);

            // Install development dependencies
            packageInstaller(
                projectPath,
                packageManager,
                [
                    "@babel/core",
                    "@babel/plugin-transform-react-jsx",
                    "@babel/plugin-transform-spread",
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "@types/react",
                    "@types/react-dom",
                    "@types/react-router-dom",
                    "@types/yup",
                    "@typescript-eslint/eslint-plugin",
                    "@typescript-eslint/parser",
                    "axios",
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
                    "moment",
                    "node-sass",
                    "nodemon",
                    "numeral",
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

            // TODO: Link to site for next steps and project directory description
            console.log(green("Installed dependencies. Project setup complete!"));
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
