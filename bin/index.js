#!/usr/bin/env node
const { prompt } = require("inquirer");
const projectTypes = ["Full Stack (NodeJS backend + React frontend)", "Front End (React)"];

console.log("mkts, 2.0.0-alpha");
console.log("Bootstrap React, NodeJS or NodeJS+React TypeScript apps with speed");
console.log("Homepage: https://github.com/kwameopareasiedu/mkts");
console.log("--------------------------------------------------\n");

prompt([
    { name: "projectName", type: "input", message: "What's the name of your app?" },
    { name: "projectType", type: "list", choices: projectTypes, message: "What type of app is this?" }
]).then(async answers => {
    const { ensureFolder } = require("../dist/utils");
    const { createFullStackApp } = require("../dist/create-full-stack-app");
    const { createFrontEndApp } = require("../dist/create-front-end-app");
    const { projectName, projectType } = answers;

    if (ensureFolder(projectName)) {
        switch (projectType) {
            case projectTypes[0]:
                await createFullStackApp(projectName);
                break;
            case projectTypes[1]:
                await createFrontEndApp(projectName);
                break;
            default:
                break;
        }
    }
});
