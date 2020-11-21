/* This modules installs a static frontend app basis at the project directory */
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
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data },
        { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data },

        { source: "src/index.tsx.ejs", target: resolve(projectPath, "src/index.tsx"), data },
        { source: "src/app.tsx.ejs", target: resolve(projectPath, "src/app.tsx"), data },
        { source: "src/app.scss.ejs", target: resolve(projectPath, "src/app.scss"), data },

        { source: "dist/index.html.ejs", target: resolve(projectPath, "dist/index.html"), data }
    ];

    console.log(cyan("Copying template files..."));

    // Create necessary sub directories
    mkdirSync(resolve(projectPath, "src"));
    mkdirSync(resolve(projectPath, "dist"));

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
                    "@babel/core@7.x.x",
                    "@babel/plugin-transform-react-jsx@7.x.x",
                    "@babel/plugin-transform-spread@7.x.x",
                    "@babel/preset-env@7.x.x",
                    "@babel/preset-react@7.x.x",
                    "@types/react@16.x.x",
                    "@types/react-dom@16.x.x",
                    "@typescript-eslint/eslint-plugin@4.x.x",
                    "@typescript-eslint/parser@4.x.x",
                    "autoprefixer@10.x.x",
                    "babel-loader@8.x.x",
                    "css-loader@5.x.x",
                    "eslint@7.x.x",
                    "eslint-config-defaults@9.x.x",
                    "eslint-plugin-react@7.x.x",
                    "faker@5.x.x",
                    "file-loader@6.x.x",
                    "node-sass@5.x.x",
                    "postcss@8.x.x",
                    "postcss-loader@4.x.x",
                    "prettier@2.x.x",
                    "react@16.x.x",
                    "react-dom@16.x.x",
                    "sass-loader@10.x.x",
                    "style-loader@2.x.x",
                    "ts-loader@8.x.x",
                    "typescript@4.x.x",
                    "url-loader@4.x.x",
                    "webpack@5.x.x",
                    "webpack-cli@4.x.x"
                ],
                true
            );
            console.log(green("Installed development dependencies!\n"));
            console.log(green("Project setup complete!\n"));

            const open = require("open");
            open("https://github.com/kwameopareasiedu/mkts/blob/master/docs/static-frontend.md#mkts--static-frontend-react");
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
