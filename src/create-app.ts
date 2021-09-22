import { dirname, relative, resolve } from "path";
import { lstatSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { renderFile } from "ejs";
import { generate } from "randomstring";
import { green } from "chalk";

interface WriteTarget {
    src: string;
    dest: string;
}

export const createApp = async (name: string, templateFolderPath: string): Promise<void> => {
    const projectPath = resolve(process.cwd(), name);
    const templateData = { projectName: name, sessionSecret: generate({ length: 48 }) };
    const templateFiles = listFiles(templateFolderPath);

    const projectFolders = templateFiles.reduce((acc, templateFile) => {
        const targetPath = resolve(projectPath, relative(templateFolderPath, dirname(templateFile)));
        if (!acc.includes(targetPath)) return [...acc, targetPath];
        return acc;
    }, []);

    const writeTargets: Array<WriteTarget> = templateFiles.map(templateFile => {
        const destinationFile = templateFile.includes("dist/client") ? templateFile : templateFile.split(".ejs")[0];

        return {
            src: templateFile,
            dest: resolve(projectPath, relative(templateFolderPath, destinationFile))
        };
    });

    for (const projectFolder of projectFolders) {
        mkdirSync(projectFolder, { recursive: true });
    }

    for (const target of writeTargets) {
        const content = await renderFile(target.src, templateData);
        writeFileSync(target.dest, content);
    }

    console.log(green("Copied files!\n"));
};

/** List all files in the specified path, including sub directories */
const listFiles = (root: string): Array<string> => {
    const searchPaths = [root];
    const targetPaths = [];

    while (searchPaths.length > 0) {
        const searchPath = searchPaths.splice(0, 1)[0];

        if (lstatSync(searchPath).isDirectory()) {
            const paths = readdirSync(searchPath);
            const absolutePaths = paths.map(p => resolve(searchPath, p));
            searchPaths.push(...absolutePaths);
        } else if (lstatSync(searchPath).isFile()) {
            targetPaths.push(searchPath);
        }
    }

    return targetPaths;
};

// createApp("hello-mkts", resolve(__dirname, "../templates/full-stack"));
