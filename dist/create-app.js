"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var ejs_1 = require("ejs");
var randomstring_1 = require("randomstring");
var chalk_1 = require("chalk");
var createApp = function (name, templateFolderPath, ignoreRenamePaths) { return __awaiter(void 0, void 0, void 0, function () {
    var projectPath, templateFiles, templateData, projectFolders, writeTargets, _i, projectFolders_1, projectFolder, _a, writeTargets_1, target, content;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                projectPath = (0, path_1.resolve)(process.cwd(), name);
                templateFiles = listFiles(templateFolderPath);
                templateData = {
                    projectName: name,
                    sessionSecret: (0, randomstring_1.generate)({ length: 48 }),
                    sessionName: (0, randomstring_1.generate)({ length: 24 })
                };
                projectFolders = templateFiles.reduce(function (acc, templateFile) {
                    var targetPath = (0, path_1.resolve)(projectPath, (0, path_1.relative)(templateFolderPath, (0, path_1.dirname)(templateFile)));
                    if (!acc.includes(targetPath))
                        return __spreadArray(__spreadArray([], acc, true), [targetPath], false);
                    return acc;
                }, []);
                writeTargets = templateFiles.map(function (templateFile) {
                    var ignoreRename = ignoreRenamePaths
                        ? ignoreRenamePaths.reduce(function (ignore, _path) {
                            return templateFile.includes(_path) ? ignore || true : ignore;
                        }, false)
                        : false;
                    var destinationFile = ignoreRename ? templateFile : templateFile.split(".ejs")[0];
                    return {
                        src: templateFile,
                        dest: (0, path_1.resolve)(projectPath, (0, path_1.relative)(templateFolderPath, destinationFile))
                    };
                });
                for (_i = 0, projectFolders_1 = projectFolders; _i < projectFolders_1.length; _i++) {
                    projectFolder = projectFolders_1[_i];
                    (0, fs_1.mkdirSync)(projectFolder, { recursive: true });
                }
                _a = 0, writeTargets_1 = writeTargets;
                _b.label = 1;
            case 1:
                if (!(_a < writeTargets_1.length)) return [3 /*break*/, 4];
                target = writeTargets_1[_a];
                return [4 /*yield*/, (0, ejs_1.renderFile)(target.src, templateData)];
            case 2:
                content = _b.sent();
                (0, fs_1.writeFileSync)(target.dest, content);
                _b.label = 3;
            case 3:
                _a++;
                return [3 /*break*/, 1];
            case 4:
                console.log((0, chalk_1.green)("Copied files!\n"));
                return [2 /*return*/];
        }
    });
}); };
exports.createApp = createApp;
/** List all files in the specified path, including sub directories */
var listFiles = function (root) {
    var searchPaths = [root];
    var targetPaths = [];
    var _loop_1 = function () {
        var searchPath = searchPaths.splice(0, 1)[0];
        if ((0, fs_1.lstatSync)(searchPath).isDirectory()) {
            var paths = (0, fs_1.readdirSync)(searchPath);
            var absolutePaths = paths.map(function (p) { return (0, path_1.resolve)(searchPath, p); });
            searchPaths.push.apply(searchPaths, absolutePaths);
        }
        else if ((0, fs_1.lstatSync)(searchPath).isFile()) {
            targetPaths.push(searchPath);
        }
    };
    while (searchPaths.length > 0) {
        _loop_1();
    }
    return targetPaths;
};
// createApp("hello-mkts", resolve(__dirname, "../templates/full-stack"));
