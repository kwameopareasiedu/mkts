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
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = void 0;
var inquirer_1 = require("inquirer");
var chalk_1 = require("chalk");
var child_process_1 = require("child_process");
var path_1 = require("path");
var installDependencies = function (name, dependencies, devDependencies) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1, answers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 2, , 4]);
                installPackages((0, path_1.resolve)(process.cwd(), name), dependencies);
                installPackages((0, path_1.resolve)(process.cwd(), name), devDependencies, true);
                console.log((0, chalk_1.green)("Installed dependencies\n"));
                // TODO: Link to site for next steps and project directory description
                return [3 /*break*/, 5];
            case 2:
                err_1 = _a.sent();
                console.log(err_1.message);
                return [4 /*yield*/, (0, inquirer_1.prompt)([
                        {
                            name: "retry",
                            message: "An error occurred while installing dependencies. Would you like to try again?",
                            type: "confirm"
                        }
                    ])];
            case 3:
                answers = _a.sent();
                if (!answers.retry) {
                    console.log((0, chalk_1.red)("Could not install dependencies. Please rerun ") + (0, chalk_1.bgRed)((0, chalk_1.bold)("mkts")) + (0, chalk_1.red)(" to try again"));
                    return [3 /*break*/, 5];
                }
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 0];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.installDependencies = installDependencies;
/** Installs NPM packages using Yarn package manager */
var installPackages = function (rootFolder, packages, dev) {
    if (dev)
        (0, child_process_1.execSync)("cd " + rootFolder + " && yarn add --dev " + packages.join(" "), { stdio: "inherit" });
    else
        (0, child_process_1.execSync)("cd " + rootFolder + " && yarn add " + packages.join(" "), { stdio: "inherit" });
};