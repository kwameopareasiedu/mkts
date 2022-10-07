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
      const err = await copyFiles(
        resolve(__dirname, "../templates/api"),
        resolve(process.cwd(), name),
        name,
        description,
        author
      );

      if (!err) {
        console.log("Copied project files!\n");
        console.log(`1. Move to project dir: cd '${name}'`);
        console.log(`2. Install dependencies: yarn install`);
        console.log(`3. Start api server on 8000 (default port): yarn dev`);
        console.log(
          `4. Test api server response: curl http://localhost:8000/ping`
        );
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

const copyFiles = async (
  source: string,
  destination: string,
  projectName: string,
  projectDescription: string,
  projectAuthor: string
): Promise<string | null> => {
  const destFiles = existsSync(destination) ? readdirSync(destination) : [];

  if (destFiles.length > 0) {
    return `error: destination '${resolve(projectName)}' is not empty`;
  }

  const filesGenerator = listFiles(source, []);

  const templateData = {
    appName: projectName,
    appDescription: projectDescription,
    appAuthor: projectAuthor,
    jwtSecret: generate({ length: 24 })
  };

  for await (const src of filesGenerator) {
    const relativeSrc = relative(resolve(source), src);
    const dest = resolve(resolve(destination), relativeSrc).replaceAll(
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
