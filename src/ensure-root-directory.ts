/* This module ensures that the project directory is present in the current folder (as indicated by pwd). If the
 * project directory does not exist, it is created. If it exists and is not empty, an overwrite prompt is shown to
 * the user
 */
module.exports = (projectName: string): boolean => {
    const { resolve } = require("path");
    const { red, bold } = require("chalk");
    const { existsSync, mkdirSync, readdirSync } = require("fs");
    const projectPath = resolve(process.cwd(), projectName);

    if (existsSync(projectPath)) {
        const contents = readdirSync(projectPath);

        if (contents.length > 0) {
            console.error(red(`Cannot create project at ${bold(`${projectPath}`)}`));
            console.error(red("The target folder is not empty"));
            return false;
        } else return true;
    } else {
        mkdirSync(projectPath);
        return true;
    }
};
