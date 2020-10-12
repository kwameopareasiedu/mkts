const { prompt } = require("inquirer");
const projectTypes = ["React (Frontend only)", "NodeJS (Server only)", "NodeJS + React", "Library"];
const packageManagers = ["Yarn", "NPM"];

prompt([
    { name: "projectName", type: "input", message: "What's the name of your app?" },
    { name: "projectType", type: "list", choices: projectTypes, message: "What type of app is this?" },
    { name: "packageManager", type: "list", choices: packageManagers, message: "Select the preferred package manager to use" }
]).then(async answers => {
    const ensureRootDir = require("../dist/ensure-root-directory");
    const installFrontend = require("../dist/install-frontend");

    const { projectName, projectType, packageManager } = answers;

    if (ensureRootDir(projectName)) {
        switch (projectType) {
            case projectTypes[0]:
                await installFrontend(projectName, packageManager);
                break;
            case projectTypes[1]:
                break;
            case projectTypes[2]:
                break;
            case projectTypes[3]:
                break;
            default:
                break;
        }
    }
});
