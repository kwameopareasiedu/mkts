import { resolve } from "path";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { bold, red } from "chalk";

/**
 * Ensures that the folder (child) is present in the current folder (parent) (as indicated by pwd).
 * If the folder does not exist, it is created else an error is thrown if it exists and is not empty
 */
export const ensureFolder = (folder: string): boolean => {
  const projectPath = resolve(process.cwd(), folder);

  if (existsSync(projectPath)) {
    const contents = readdirSync(projectPath);

    if (contents.length > 0) {
      console.error(red(`Cannot create project at ${bold(`${projectPath}`)}`));
      console.error(red("The target directory is not empty"));
      return false;
    } else return true;
  } else {
    mkdirSync(projectPath);
    return true;
  }
};
