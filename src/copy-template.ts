#!/usr/bin/env node
import { readdirSync, cpSync, existsSync } from "fs";
import { relative, resolve } from "path";

import { program as copyTemplate } from "commander";

async function* listFiles(dir: string, ignores: Array<string>) {
  const dirents = readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (!ignores.includes(dirent.name)) {
      if (dirent.isDirectory()) {
        yield* listFiles(res, ignores);
      } else {
        yield res;
      }
    }
  }
}

copyTemplate
  .argument("<source>", "Template source directory")
  .argument("<destination>", "Destination directory")
  .option("--ignore <dirs...>", "List of directories to ignore")
  .action(async (source, destination, options: { ignore?: Array<string> }) => {
    const destFiles = existsSync(destination) ? readdirSync(destination) : [];

    if (destFiles.length > 0) {
      return console.error("error: destination is not empty");
    }

    const filesGenerator = listFiles(source, options.ignore);
    let fileCount = 0;

    for await (const src of filesGenerator) {
      const relativeSrc = relative(resolve(source), src);
      const dest = resolve(resolve(destination), relativeSrc) + ".ejs";
      cpSync(src, dest, { recursive: true });
      console.log(`copied '${src}' -> '${dest}'`);
      fileCount++;
    }

    console.log(
      `${fileCount} files copied from '${resolve(source)}' to '${resolve(
        destination
      )}'`
    );
  });

copyTemplate.parse(process.argv);
