#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const commander_1 = require("commander");
async function* listFiles(dir, ignores) {
    const dirents = (0, fs_1.readdirSync)(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = (0, path_1.resolve)(dir, dirent.name);
        if (!ignores.includes(dirent.name)) {
            if (dirent.isDirectory()) {
                yield* listFiles(res, ignores);
            }
            else {
                yield res;
            }
        }
    }
}
commander_1.program
    .argument("<source>", "Template source directory")
    .argument("<destination>", "Destination directory")
    .option("--ignore <dirs...>", "List of directories to ignore")
    .action(async (source, destination, options) => {
    const destFiles = (0, fs_1.existsSync)(destination) ? (0, fs_1.readdirSync)(destination) : [];
    if (destFiles.length > 0) {
        return console.error("error: destination is not empty");
    }
    const filesGenerator = listFiles(source, options.ignore);
    let fileCount = 0;
    for await (const src of filesGenerator) {
        const relativeSrc = (0, path_1.relative)((0, path_1.resolve)(source), src);
        const dest = (0, path_1.resolve)((0, path_1.resolve)(destination), relativeSrc) + ".ejs";
        (0, fs_1.cpSync)(src, dest, { recursive: true });
        console.log(`copied '${src}' -> '${dest}'`);
        fileCount++;
    }
    console.log(`${fileCount} files copied from '${(0, path_1.resolve)(source)}' to '${(0, path_1.resolve)(destination)}'`);
});
commander_1.program.parse(process.argv);
