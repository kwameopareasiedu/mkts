#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer = require("inquirer");
const create_project_1 = require("./create-project");
const utils_1 = require("./utils");
commander_1.program
    .name("mkts")
    .description("Create modern web, api or library projects with Typescript in seconds")
    .version("3.0.0");
commander_1.program
    .command("new")
    .argument("<name>", "The name for the project. This is also the project folder name. E.g. 'Awesome Todo' will have a folder called 'awesome-todo'")
    .description("Create a new typescript project")
    .option("--api", "Create an backend API project in NodeJS")
    .option("--web", "Create a frontend web project using React + Vite")
    .option("--lib", "Create a library project")
    .action(async (name, { api, lib }) => {
    if (!api && !lib) {
        return console.error("error: missing project type ");
    }
    else if (+!!api + +!!lib > 1) {
        return console.error("error: only one of --api, --web and --lib can be used");
    }
    const type = resolveProjectType(api, lib);
    const answers = (await inquirer.prompt([
        {
            name: "description",
            type: "input",
            message: "Short project description"
        },
        {
            name: "author",
            type: "input",
            message: "Name of author"
        }
    ]));
    await (0, create_project_1.default)(type, name, answers.description, answers.author);
});
// mkts
//   .command("prepare-deploy")
//   .description("Create a deploy script for the specified platform")
//   .option("--ubuntu", "Create a deploy shell script for Ubuntu 18.04+")
//   .action(({ ubuntu }) => {
//     console.log({ ubuntu });
//   });
const resolveProjectType = (isApi, isLib) => {
    if (isApi)
        return utils_1.projectTypes.api;
    if (isLib)
        return utils_1.projectTypes.lib;
    throw new Error("Invalid project type");
};
commander_1.program.parse(process.argv);
