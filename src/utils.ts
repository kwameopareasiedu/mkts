import { readdirSync } from "fs";
import { resolve } from "path";

export const projectTypes = {
  api: "api",
  lib: "lib"
};

export async function* listFiles(
  dir: string,
  ignores: Array<string>
): AsyncGenerator<any> {
  const dirents = readdirSync(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (
      !ignores.includes(dirent.name) &&
      !ignores.includes(dirent.name + "/")
    ) {
      if (dirent.isDirectory()) {
        yield* listFiles(res, ignores);
      } else {
        yield res;
      }
    }
  }
}
