/* This modules installs a static frontend app basis at the project directory */
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
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data: { projectName } },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data: { projectName } },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data: { projectName } },
        { source: "index.html.ejs", target: resolve(projectPath, "index.html"), data: { projectName } },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: { projectName } },
        { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data: { projectName } },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data: { projectName } },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data: { projectName } },

        { source: "src/index.tsx.ejs", target: resolve(projectPath, "src/index.tsx"), data: { projectName } },
        { source: "src/app.tsx.ejs", target: resolve(projectPath, "src/app.tsx"), data: { projectName } },
        { source: "src/app.scss.ejs", target: resolve(projectPath, "src/app.scss"), data: { projectName } }
    ];

    console.log(cyan("Copying template files..."));

    // Create necessary sub directories
    mkdirSync(resolve(projectPath, "src"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve("../", "templates", "static-frontend", source), data || {}, {});
        writeFileSync(target, content);
    }

    console.log(green("Copied template files!\n"));

    // Install development dependencies
    while (true) {
        try {
            console.log(cyan("Installing development dependencies..."));
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
                    "@typescript-eslint/eslint-plugin",
                    "@typescript-eslint/parser",
                    "autoprefixer",
                    "babel-loader",
                    "css-loader",
                    "eslint",
                    "eslint-config-defaults",
                    "eslint-plugin-react",
                    "faker",
                    "file-loader",
                    "node-sass",
                    "postcss",
                    "postcss-loader",
                    "prettier",
                    "react",
                    "react-dom",
                    "sass-loader",
                    "style-loader",
                    "ts-loader",
                    "typescript",
                    "url-loader",
                    "webpack",
                    "webpack-cli"
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