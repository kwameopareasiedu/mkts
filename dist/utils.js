"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureFolder = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
/**
 * Ensures that the folder (child) is present in the current folder (parent) (as indicated by pwd).
 * If the folder does not exist, it is created else an error is thrown if it exists and is not empty
 */
var ensureFolder = function (folder) {
    var projectPath = (0, path_1.resolve)(process.cwd(), folder);
    if ((0, fs_1.existsSync)(projectPath)) {
        var contents = (0, fs_1.readdirSync)(projectPath);
        if (contents.length > 0) {
            console.error((0, chalk_1.red)("Cannot create project at " + (0, chalk_1.bold)("" + projectPath)));
            console.error((0, chalk_1.red)("The target directory is not empty"));
            return false;
        }
        else
            return true;
    }
    else {
        (0, fs_1.mkdirSync)(projectPath);
        return true;
    }
};
exports.ensureFolder = ensureFolder;
