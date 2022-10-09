#!/usr/bin/env node
import { program as mkts } from "commander";
import * as inquirer from "inquirer";
import createProject from "./create-project";
import { projectTypes } from "./utils";

mkts
  .name("mkts")
  .description(
    "Create modern web, api or library projects with Typescript in seconds"
  )
  .version("3.0.0");

mkts
  .command("new")
  .argument(
    "<name>",
    "The name for the project. This is also the project folder name. E.g. 'Awesome Todo' will have a folder called 'awesome-todo'"
  )
  .description("Create a new typescript project")
  .option("--api", "Create an backend API project in NodeJS")
  .option("--web", "Create a frontend web project using React + Vite")
  .option("--lib", "Create a library project")
  .action(async (name, { api, web, lib }) => {
    if (!api && !web && !lib) {
      return console.error("error: missing project type ");
    } else if (+!!api + +!!web + +!!lib > 1) {
      return console.error(
        "error: only one of --api, --web and --lib can be used"
      );
    }

    const type = resolveProjectType(api, web, lib);

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
    ])) as any;

    await createProject(type, name, answers.description, answers.author);
  });

mkts
  .command("example")
  .description("Create an example project using the MKTS tool")
  .argument(
    "<name>",
    "The name for the project. This is also the project folder name. E.g. 'Awesome Todo' will have a folder called 'awesome-todo'"
  )
  .action(name => {
    console.log({ name });
  });

mkts
  .command("prepare-deploy")
  .description("Create a deploy script for the specified platform")
  .option("--ubuntu", "Create a deploy shell script for Ubuntu 18.04+")
  .action(({ ubuntu }) => {
    console.log({ ubuntu });
  });

const resolveProjectType = (isApi: boolean, isWeb: boolean, isLib: boolean) => {
  if (isApi) return projectTypes.api;
  if (isWeb) return projectTypes.web;
  if (isLib) return projectTypes.lib;
  throw new Error("Invalid project type");
};

mkts.parse(process.argv);
