/* This modules installs a frontend server app basis at the project directory */
module.exports = async (projectName: string, packageManager: string): Promise<void> => {
    const { resolve } = require("path");
    const { renderFile } = require("ejs");
    const { prompt } = require("inquirer");
    const { writeFileSync, mkdirSync } = require("fs");
    const { bold, red, bgRed, green, cyan } = require("chalk");
    const packageInstaller = require("./package-installer");
    const { destroyDirectory } = require("./utils");

    const data = { projectName };
    const projectPath = resolve(process.cwd(), projectName);

    // Enumerate the template files
    const templateFiles = [
        { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js"), data },
        { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc"), data },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data },
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data },
        { source: "nodemon.json.ejs", target: resolve(projectPath, "nodemon.json"), data },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data },
        { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data },
        { source: "server.js.ejs", target: resolve(projectPath, "server.js"), data },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data },
        { source: "types.ts.ejs", target: resolve(projectPath, "types.ts"), data },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data },
        { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js"), data },

        { source: "dist/public/index.ejs", target: resolve(projectPath, "dist/public/index.html"), data },

        { source: "src/common/stylesheets/config.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/config.scss"), data },
        { source: "src/common/stylesheets/index.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/index.scss"), data },
        { source: "src/common/stylesheets/status.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/status.scss"), data },
        { source: "src/common/stylesheets/utils.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/utils.scss"), data },
        { source: "src/common/index.ts.ejs", target: resolve(projectPath, "src/common/index.ts"), data },
        { source: "src/common/utils.tsx.ejs", target: resolve(projectPath, "src/common/utils.tsx"), data },
        { source: "src/public/login/index.tsx.ejs", target: resolve(projectPath, "src/public/login/index.tsx"), data },
        { source: "src/public/login/index.scss.ejs", target: resolve(projectPath, "src/public/login/index.scss"), data },
        { source: "src/public/logout/index.tsx.ejs", target: resolve(projectPath, "src/public/logout/index.tsx"), data },
        { source: "src/public/app.tsx.ejs", target: resolve(projectPath, "src/public/app.tsx"), data },
        { source: "src/public/index.tsx.ejs", target: resolve(projectPath, "src/public/index.tsx"), data }
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
        const content = await renderFile(resolve(__dirname, "../", "templates", "frontend-server", source), data || {}, {});
        writeFileSync(target, content);
    }

    console.log(green("Copied template files!\n"));

    while (true) {
        try {
            // Install dependencies
            console.log(cyan("Installing dependencies..."));
            packageInstaller(projectPath, packageManager, ["cookie-parser", "debug", "express", "express-session", "morgan"]);
            console.log(green("Installed dependencies!\n"));

            // Install development dependencies
            console.log(cyan("Installing development dependencies..."));
            packageInstaller(
                projectPath,
                packageManager,
                [
                    "@babel/core@7.x.x",
                    "@babel/plugin-transform-react-jsx@7.x.x",
                    "@babel/plugin-transform-spread@7.x.x",
                    "@babel/preset-env@7.x.x",
                    "@babel/preset-react@7.x.x",
                    "@types/react@16.x.x",
                    "@types/react-dom@16.x.x",
                    "@types/react-router-dom@5.x.x",
                    "@types/yup@0.x.x",
                    "@typescript-eslint/eslint-plugin@4.x.x",
                    "@typescript-eslint/parser@4.x.x",
                    "axios@0.x.x",
                    "autoprefixer@8.x.x",
                    "babel-loader@5.x.x",
                    "concurrently@5.x.x",
                    "css-loader@5.x.x",
                    "eslint@7.x.x",
                    "eslint-config-defaults@9.x.x",
                    "eslint-plugin-react@7.x.x",
                    "faker@5.x.x",
                    "file-loader@6.x.x",
                    "formik@2.x.x",
                    "moment@2.x.x",
                    "node-sass@5.x.x",
                    "nodemon@2.x.x",
                    "numeral@2.x.x",
                    "postcss@8.x.x",
                    "postcss-loader@4.x.x",
                    "prettier@2.x.x",
                    "react@16.x.x",
                    "react-dom@16.x.x",
                    "react-router-dom@5.x.x",
                    "react-simple-widgets@3.x.x",
                    "sass-loader@10.x.x",
                    "style-loader@2.x.x",
                    "ts-loader@8.x.x",
                    "typescript@4.x.x",
                    "url-loader@4.x.x",
                    "webpack@5.x.x",
                    "webpack-cli@4.x.x",
                    "yup@0.x.x"
                ],
                true
            );
            console.log(green("Installed development dependencies!\n"));

            // TODO: Link to site for next steps and project directory description
            console.log(green("Project setup complete!\n"));
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
