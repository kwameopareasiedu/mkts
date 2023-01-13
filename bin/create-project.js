"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const fs_1 = require("fs");
const path_1 = require("path");
const ejs_1 = require("ejs");
const randomstring_1 = require("randomstring");
const dayjs = require("dayjs");
async function createProject(type, name, description, author) {
    const projectDir = (0, path_1.resolve)(process.cwd(), name);
    switch (type) {
        case utils_1.projectTypes.api: {
            const templateDir = (0, path_1.resolve)(__dirname, "../templates/api");
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
        }
        case utils_1.projectTypes.lib:
            const templateDir = (0, path_1.resolve)(__dirname, "../templates/lib");
            const err = await scaffoldProject(templateDir, projectDir, name, description, author);
            if (!err) {
                console.log(`Scaffolded project in '${projectDir}'!\n`);
                console.log(`1. Move to project dir: cd '${name}'`);
                console.log(`2. Install dependencies: yarn install`);
                console.log(`3. Create your library. Entry point is src/index.ts: https://blog.deepgram.com/build-npm-packages/`);
                console.log(`4. Build library: yarn build`);
                console.log(`5. Publish library to NPM`);
                console.log(`6. Install library into another project and use`);
            }
            else
                console.error(err);
            return;
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
        appYear: dayjs().year(),
        jwtSecret: (0, randomstring_1.generate)({ length: 24 })
    };
    for await (const src of templateFilesGenerator) {
        const relativeSrc = (0, path_1.relative)((0, path_1.resolve)(templateDir), src);
        const dest = (0, path_1.resolve)((0, path_1.resolve)(projectDir), relativeSrc).replaceAll(".ejs", "");
        (0, fs_1.cpSync)(src, dest, { recursive: true });
        try {
            const content = await (0, ejs_1.renderFile)(src, templateData);
            (0, fs_1.writeFileSync)(dest, content);
        }
        catch (err) {
            console.warn(`warning: ${err.message}'`);
            console.warn(`warning: could not render content to '${dest}'`);
        }
        console.log(`created '${dest}'`);
    }
    return null;
};
