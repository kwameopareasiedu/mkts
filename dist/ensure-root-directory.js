var resolve = require("path").resolve;
var _a = require("chalk"), red = _a.red, bold = _a.bold;
var _b = require("fs"), existsSync = _b.existsSync, mkdirSync = _b.mkdirSync, readdirSync = _b.readdirSync;
/* This module ensures that the project directory is present in the current folder (as indicated by pwd). If the
 * project directory does not exist, it is created. If it exists and is not empty, an overwrite prompt is shown to
 * the user
 */
module.exports = function (projectName) {
    var projectPath = resolve(process.cwd(), projectName);
    if (existsSync(projectPath)) {
        var contents = readdirSync(projectPath);
        if (contents.length > 0) {
            console.error(red("Cannot create project at " + bold("" + projectPath)));
            console.error(red("The target folder is not empty"));
            return false;
        }
        else
            return true;
    }
    else {
        mkdirSync(projectPath);
        return true;
    }
};
