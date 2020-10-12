/* This modules installs a frontend app basis at the project directory */
module.exports = async (projectName: string, packageManager: string): Promise<void> => {
    const { resolve } = require("path");
    const { renderFile } = require("ejs");
    const { writeFileSync, mkdirSync } = require("fs");
    const packageInstaller = require("./package-installer");
    const projectPath = resolve(process.cwd(), projectName);

    // Enumerate the template files
    const templateFiles = [
        { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js") },
        { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc") },
        { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc") },
        { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore") },
        { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts") },
        { source: "index.html.ejs", target: resolve(projectPath, "index.html"), data: { projectName } },
        { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: { projectName } },
        { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json") },
        { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js") },
        { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js") },
        { source: "src/index.tsx.ejs", target: resolve(projectPath, "src/index.tsx") },
        { source: "src/app.tsx.ejs", target: resolve(projectPath, "src/app.tsx"), data: { projectName } },
        { source: "src/app.scss.ejs", target: resolve(projectPath, "src/app.scss") }
    ];

    // Create necessary sub folders
    mkdirSync(resolve(projectPath, "src"));

    // Copy the template files
    for (const { source, target, data } of templateFiles) {
        const content = await renderFile(resolve("../", "templates", "frontend", source), data || {}, {});
        writeFileSync(target, content);
    }

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
};
