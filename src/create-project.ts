import { listFiles, projectTypes } from "./utils";
import { cpSync, existsSync, readdirSync, writeFileSync } from "fs";
import { relative, resolve } from "path";
import { renderFile } from "ejs";
import { generate } from "randomstring";
import * as dayjs from "dayjs";

export default async function createProject(
  type: string,
  name: string,
  description: string,
  author: string
) {
  const projectDir = resolve(process.cwd(), name);

  switch (type) {
    case projectTypes.api: {
      const templateDir = resolve(__dirname, "../templates/api");
      const err = await scaffoldProject(
        templateDir,
        projectDir,
        name,
        description,
        author
      );

      if (!err) {
        console.log(`Scaffolded project in '${projectDir}'!\n`);
        console.log(`1. Move to project dir: cd '${name}'`);
        console.log(`2. Install dependencies: yarn install`);
        console.log(`3. Start api server: yarn dev`);
        console.log(`4. Test api server: curl http://localhost:8000/ping`);
      } else console.error(err);

      return;
    }
    case projectTypes.lib:
      const templateDir = resolve(__dirname, "../templates/lib");
      const err = await scaffoldProject(
        templateDir,
        projectDir,
        name,
        description,
        author
      );

      if (!err) {
        console.log(`Scaffolded project in '${projectDir}'!\n`);
        console.log(`1. Move to project dir: cd '${name}'`);
        console.log(`2. Install dependencies: yarn install`);
        console.log(
          `3. Create your library. Entry point is src/index.ts: https://blog.deepgram.com/build-npm-packages/`
        );
        console.log(`4. Build library: yarn build`);
        console.log(`5. Publish library to NPM`);
        console.log(`6. Install library into another project and use`);
      } else console.error(err);

      return;
    default:
      throw new Error(`error: invalid project type '${type}'`);
  }
}

const scaffoldProject = async (
  templateDir: string,
  projectDir: string,
  projectName: string,
  projectDescription: string,
  projectAuthor: string
): Promise<string | null> => {
  const destFiles = existsSync(projectDir) ? readdirSync(projectDir) : [];

  if (destFiles.length > 0) {
    return `error: destination '${resolve(projectName)}' is not empty`;
  }

  const templateFilesGenerator = listFiles(templateDir, []);

  const templateData = {
    appName: projectName,
    appDescription: projectDescription,
    appAuthor: projectAuthor,
    appYear: dayjs().year(),
    jwtSecret: generate({ length: 24 })
  };

  for await (const src of templateFilesGenerator) {
    const relativeSrc = relative(resolve(templateDir), src);
    const dest = resolve(resolve(projectDir), relativeSrc).replaceAll(
      ".ejs",
      ""
    );

    cpSync(src, dest, { recursive: true });

    try {
      const content = await renderFile(src, templateData);
      writeFileSync(dest, content);
    } catch (err) {
      console.warn(`warning: ${err.message}'`);
      console.warn(`warning: could not render content to '${dest}'`);
    }

    console.log(`created '${dest}'`);
  }

  return null;
};
