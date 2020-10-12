const { prompt } = require("inquirer");
const ensureRootDir = require("../dist/ensure-root-directory");
const projectTypes = ["React (Frontend only)", "NodeJS (Server only)", "NodeJS + React", "Library"];
const packageManagers = ["Yarn", "NPM"];

prompt([
    { name: "projectName", type: "input", message: "What's the name of your app?" },
    { name: "projectType", type: "list", choices: projectTypes, message: "What type of app is this?" },
    { name: "packageManager", type: "list", choices: packageManagers, message: "Select the preferred package manager to use" }
]).then(answers => {
    const { projectName, projectType, packageManager } = answers;

    if (ensureRootDir(projectName)) {

    }
});
