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
            const templateDir = (0, path_1.resolve)(__dirname, "../templates/api");
            const projectDir = (0, path_1.resolve)(process.cwd(), name);
            const err = await scaffoldProject(templateDir, projectDir, name, description, author);
            if (!err) {
                console.log(`Scaffolded project in '${projectDir}'!\n`);
                console.log(`1. Move to project dir: cd '${name}'`);
                console.log(`2. Install dependencies: yarn install`);
                console.log(`3. Start api server: yarn dev`);
                console.log(`4. Test api server: curl http://localhost:8000/ping`);
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
const scaffoldProject = async (templateDir, projectDir, projectName, projectDescription, projectAuthor) => {
    const destFiles = (0, fs_1.existsSync)(projectDir) ? (0, fs_1.readdirSync)(projectDir) : [];
    if (destFiles.length > 0) {
        return `error: destination '${(0, path_1.resolve)(projectName)}' is not empty`;
    }
    const templateFilesGenerator = (0, utils_1.listFiles)(templateDir, []);
    const templateData = {
        appName: projectName,
        appDescription: projectDescription,
        appAuthor: projectAuthor,
        jwtSecret: (0, randomstring_1.generate)({ length: 24 })
    };
    for await (const src of templateFilesGenerator) {
        const relativeSrc = (0, path_1.relative)((0, path_1.resolve)(templateDir), src);
        const dest = (0, path_1.resolve)((0, path_1.resolve)(projectDir), relativeSrc).replaceAll(".ejs", "");
        const content = await (0, ejs_1.renderFile)(src, templateData);
        (0, fs_1.cpSync)(src, dest, { recursive: true });
        (0, fs_1.writeFileSync)(dest, content);
        console.log(`created '${dest}'`);
    }
    return null;
};
