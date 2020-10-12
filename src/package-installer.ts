/* This module uses the specified package manager to install packages in a project folder */
module.exports = (projectPath: string, packageManager: string, packages: Array<string>, asDev?: boolean) => {
    const { execSync } = require("child_process");

    switch (packageManager.toLowerCase()) {
        case "npm":
            if (asDev) execSync(`cd ${projectPath} && npm i -D ${packages.join(" ")}`, { stdio: "inherit" });
            else execSync(`cd ${projectPath} && npm i --save ${packages.join(" ")}`, { stdio: "inherit" });
            break;
        case "yarn":
            if (asDev) execSync(`cd ${projectPath} && yarn add --dev ${packages.join(" ")}`, { stdio: "inherit" });
            else execSync(`cd ${projectPath} && yarn add ${packages.join(" ")}`, { stdio: "inherit" });
            break;
        default:
            throw new Error(`Unrecognized package manager: ${packageManager}`);
    }
};
