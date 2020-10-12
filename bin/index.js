const { prompt } = require("inquirer");
const projectTypes = ["React (Frontend only)", "NodeJS (Server only)", "NodeJS + React", "Library"];
const packageManagers = ["Yarn", "NPM"];

prompt([
    { name: "projectName", type: "input", message: "What is the name of your app?" },
    { name: "projectType", type: "list", choices: projectTypes, message: "What type of app is this?" },
    { name: "packageManager", type: "list", choices: packageManagers, message: "Select the preferred package manager to use" }
]).then(answers => {
    console.log(answers);
});
