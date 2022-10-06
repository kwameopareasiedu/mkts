import { prompt } from "inquirer";
import { bgRed, bold, green, red } from "chalk";
import { execSync } from "child_process";
import { resolve } from "path";

export const installDependencies = async (
  name: string,
  dependencies: Array<string>,
  devDependencies: Array<string>
): Promise<void> => {
  while (true) {
    try {
      installPackages(resolve(process.cwd(), name), dependencies);
      installPackages(resolve(process.cwd(), name), devDependencies, true);
      console.log(green("Installed dependencies\n"));

      // TODO: Link to site for next steps and project directory description
      break;
    } catch (err) {
      console.log(err.message);

      const answers = await prompt([
        {
          name: "retry",
          message:
            "An error occurred while installing dependencies. Would you like to try again?",
          type: "confirm"
        }
      ]);

      if (!answers.retry) {
        console.log(
          red("Could not install dependencies. Please rerun ") +
            bgRed(bold("mkts")) +
            red(" to try again")
        );
        break;
      }
    }
  }
};

/** Installs NPM packages using Yarn package manager */
const installPackages = (
  rootFolder: string,
  packages: Array<string>,
  dev?: boolean
): void => {
  if (dev)
    execSync(`cd ${rootFolder} && yarn add --dev ${packages.join(" ")}`, {
      stdio: "inherit"
    });
  else
    execSync(`cd ${rootFolder} && yarn add ${packages.join(" ")}`, {
      stdio: "inherit"
    });
};
