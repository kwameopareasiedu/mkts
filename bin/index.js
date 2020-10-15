const { prompt } = require("inquirer");
const projectTypes = [
    "React (Static frontend)",
    "React (Frontend server)",
    "NodeJS (Backend server)",
    "NodeJS + React (Full application)",
    "Library (NPM)",
    "Electron (Desktop)",
];
const packageManagers = ["Yarn", "NPM"];

console.log("mkts, 0.1.0");
console.log("Bootstrap typescript application without the hassle");
console.log("Project page: https://github.com/kwameopareasiedu/mkts");
console.log("------------------------------------------------------\n");

prompt([
    { name: "projectName", type: "input", message: "What's the name of your app?" },
    { name: "projectType", type: "list", choices: projectTypes, message: "What type of app is this?" },
    { name: "packageManager", type: "list", choices: packageManagers, message: "Select the preferred package manager to use" }
]).then(async answers => {
    const ensureRootDir = require("../dist/ensure-root-directory");
    const installStaticFrontend = require("../dist/install-static-frontend");
    const installFrontendServer = require("../dist/install-frontend-server");
    const installBackendServer = require("../dist/install-backend-server");

    const { projectName, projectType, packageManager } = answers;

    if (ensureRootDir(projectName)) {
        switch (projectType) {
            case projectTypes[0]:
                await installStaticFrontend(projectName, packageManager);
                break;
            case projectTypes[1]:
                await installFrontendServer(projectName, packageManager);
                break;
            case projectTypes[2]:
                await installBackendServer(projectName, packageManager);
                break;
            case projectTypes[3]:
                break;
            case projectTypes[4]:
                break;
            case projectTypes[5]:
                break;
            default:
                break;
        }
    }
});
