"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const fs_1 = require("fs");
const path_1 = require("path");
const ejs_1 = require("ejs");
const randomstring_1 = require("randomstring");
async function createProject(type, name, description, author) {
    switch (type) {
        case utils_1.projectTypes.api:
            const err = await copyFiles((0, path_1.resolve)(__dirname, "../templates/api"), (0, path_1.resolve)(process.cwd(), name), name, description, author);
            if (!err) {
                console.log("Copied project files!\n");
                console.log(`1. Move to project dir: cd '${name}'`);
                console.log(`2. Install dependencies: yarn install`);
                console.log(`3. Start api server on 8000 (default port): yarn dev`);
                console.log(`4. Test api server response: curl http://localhost:8000/ping`);
            }
            else
                console.error(err);
            return;
        // case projectTypes.web:
        //   return;
        // case projectTypes.lib:
        //   return;
        default:
            throw new Error(`error: invalid project type '${type}'`);
    }
}
exports.default = createProject;
const copyFiles = async (source, destination, projectName, projectDescription, projectAuthor) => {
    const destFiles = (0, fs_1.existsSync)(destination) ? (0, fs_1.readdirSync)(destination) : [];
    if (destFiles.length > 0) {
        return `error: destination '${(0, path_1.resolve)(projectName)}' is not empty`;
    }
    const filesGenerator = (0, utils_1.listFiles)(source, []);
    const templateData = {
        appName: projectName,
        appDescription: projectDescription,
        appAuthor: projectAuthor,
        jwtSecret: (0, randomstring_1.generate)({ length: 24 })
    };
    for await (const src of filesGenerator) {
        const relativeSrc = (0, path_1.relative)((0, path_1.resolve)(source), src);
        const dest = (0, path_1.resolve)((0, path_1.resolve)(destination), relativeSrc).replaceAll(".ejs", "");
        const content = await (0, ejs_1.renderFile)(src, templateData);
        (0, fs_1.cpSync)(src, dest, { recursive: true });
        (0, fs_1.writeFileSync)(dest, content);
        console.log(`created '${dest}'`);
    }
    return null;
};
