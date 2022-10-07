import { listFiles, projectTypes } from "./utils";
import { cpSync, existsSync, readdirSync, writeFileSync } from "fs";
import { relative, resolve } from "path";
import { renderFile } from "ejs";
import { generate } from "randomstring";

export default async function createProject(
  type: string,
  name: string,
  description: string,
  author: string
) {
  switch (type) {
    case projectTypes.api:
      const templateDir = resolve(__dirname, "../templates/api");
      const projectDir = resolve(process.cwd(), name);

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
    // case projectTypes.web:
    //   return;
    // case projectTypes.lib:
    //   return;
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
    jwtSecret: generate({ length: 24 })
  };

  for await (const src of templateFilesGenerator) {
    const relativeSrc = relative(resolve(templateDir), src);
    const dest = resolve(resolve(projectDir), relativeSrc).replaceAll(
      ".ejs",
      ""
    );
    const content = await renderFile(src, templateData);

    cpSync(src, dest, { recursive: true });
    writeFileSync(dest, content);

    console.log(`created '${dest}'`);
  }

  return null;
};
