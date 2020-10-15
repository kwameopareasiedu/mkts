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
        { source: "knexfile.js.ejs", target: resolve(projectPath, "knexfile.js"), data: { projectName } },
        { source: "nodemon.json.ejs", target: resolve(projectPath, "nodemon.json"), data: { projectName } },
        { source: "nodemon-template.json.ejs", target: resolve(projectPath, "nodemon-template.json"), data: { projectName } },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: { projectName } },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data: { projectName } },

        { source: "src/models/config.ts.ejs", target: resolve(projectPath, "src/models/config.ts"), data: { projectName } },
        { source: "src/models/root.ts.ejs", target: resolve(projectPath, "src/models/root.ts"), data: { projectName } },
        { source: "src/models/user.ts.ejs", target: resolve(projectPath, "src/models/user.ts"), data: { projectName } },
        { source: "src/routes/index.ts.ejs", target: resolve(projectPath, "src/routes/index.ts"), data: { projectName } },
        { source: "src/services/storage/config.ts.ejs", target: resolve(projectPath, "src/services/storage/config.ts"), data: { projectName } },
        { source: "src/services/storage/basic.ts.ejs", target: resolve(projectPath, "src/services/storage/basic.ts"), data: { projectName } },
        { source: "src/services/storage/index.ts.ejs", target: resolve(projectPath, "src/services/storage/index.ts"), data: { projectName } },
        { source: "src/app.ts.ejs", target: resolve(projectPath, "src/app.ts"), data: { projectName } },
        { source: "src/knexfile.js.ejs", target: resolve(projectPath, "src/knexfile.js"), data: { projectName } },
        { source: "src/utils.ts.ejs", target: resolve(projectPath, "src/utils.ts"), data: { projectName } }
    ];

    console.log(cyan("Copying template files..."));

    // Create necessary sub directories
    mkdirSync(resolve(projectPath, "dist"));
    mkdirSync(resolve(projectPath, "src"));
    mkdirSync(resolve(projectPath, "src/models"));
    mkdirSync(resolve(projectPath, "src/routes"));
    mkdirSync(resolve(projectPath, "src/services"));
    mkdirSync(resolve(projectPath, "src/services/storage"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve("../", "templates", "backend-server", source), data || {}, {});
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
                    "@types/morgan",
                    "@types/pg",
                    "@types/redis",
                    "@types/validator",
                    "@typescript-eslint/eslint-plugin",
                    "@typescript-eslint/parser",
                    "eslint",
                    "eslint-config-defaults",
                    "eslint-plugin-react",
                    "faker",
                    "nodemon",
                    "prettier",
                    "typescript"
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
