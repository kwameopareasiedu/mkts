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
var _this = this;
/* This modules installs a frontend server app basis at the project directory */
module.exports = function (projectName, packageManager) { return __awaiter(_this, void 0, void 0, function () {
    var resolve, renderFile, prompt, _a, writeFileSync, mkdirSync, _b, bold, red, bgRed, green, cyan, packageInstaller, destroyDirectory, data, projectPath, templateFiles, _i, templateFiles_1, _c, source, target, data_1, content, err_1, answers;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                resolve = require("path").resolve;
                renderFile = require("ejs").renderFile;
                prompt = require("inquirer").prompt;
                _a = require("fs"), writeFileSync = _a.writeFileSync, mkdirSync = _a.mkdirSync;
                _b = require("chalk"), bold = _b.bold, red = _b.red, bgRed = _b.bgRed, green = _b.green, cyan = _b.cyan;
                packageInstaller = require("./package-installer");
                destroyDirectory = require("./utils").destroyDirectory;
                data = { projectName: projectName };
                projectPath = resolve(process.cwd(), projectName);
                templateFiles = [
                    { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js"), data: data },
                    { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc"), data: data },
                    { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore"), data: data },
                    { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc"), data: data },
                    { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts"), data: data },
                    { source: "nodemon.json.ejs", target: resolve(projectPath, "nodemon.json"), data: data },
                    { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: data },
                    { source: "postcss.config.js.ejs", target: resolve(projectPath, "postcss.config.js"), data: data },
                    { source: "server.js.ejs", target: resolve(projectPath, "server.js"), data: data },
                    { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json"), data: data },
                    { source: "types.ts.ejs", target: resolve(projectPath, "types.ts"), data: data },
                    { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js"), data: data },
                    { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js"), data: data },
                    { source: "dist/public/index.ejs", target: resolve(projectPath, "dist/public/index.html"), data: data },
                    { source: "src/common/stylesheets/config.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/config.scss"), data: data },
                    { source: "src/common/stylesheets/index.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/index.scss"), data: data },
                    { source: "src/common/stylesheets/status.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/status.scss"), data: data },
                    { source: "src/common/stylesheets/utils.scss.ejs", target: resolve(projectPath, "src/common/stylesheets/utils.scss"), data: data },
                    { source: "src/common/index.ts.ejs", target: resolve(projectPath, "src/common/index.ts"), data: data },
                    { source: "src/common/utils.tsx.ejs", target: resolve(projectPath, "src/common/utils.tsx"), data: data },
                    { source: "src/public/login/index.tsx.ejs", target: resolve(projectPath, "src/public/login/index.tsx"), data: data },
                    { source: "src/public/login/index.scss.ejs", target: resolve(projectPath, "src/public/login/index.scss"), data: data },
                    { source: "src/public/logout/index.tsx.ejs", target: resolve(projectPath, "src/public/logout/index.tsx"), data: data },
                    { source: "src/public/app.tsx.ejs", target: resolve(projectPath, "src/public/app.tsx"), data: data },
                    { source: "src/public/index.tsx.ejs", target: resolve(projectPath, "src/public/index.tsx"), data: data }
                ];
                console.log(cyan("Copying template files..."));
                // Create necessary sub directories
                mkdirSync(resolve(projectPath, "dist"));
                mkdirSync(resolve(projectPath, "dist/public"));
                mkdirSync(resolve(projectPath, "dist/lib"));
                mkdirSync(resolve(projectPath, "src"));
                mkdirSync(resolve(projectPath, "src/common"));
                mkdirSync(resolve(projectPath, "src/common/stylesheets"));
                mkdirSync(resolve(projectPath, "src/public"));
                mkdirSync(resolve(projectPath, "src/public/login"));
                mkdirSync(resolve(projectPath, "src/public/logout"));
                _i = 0, templateFiles_1 = templateFiles;
                _d.label = 1;
            case 1:
                if (!(_i < templateFiles_1.length)) return [3 /*break*/, 4];
                _c = templateFiles_1[_i], source = _c.source, target = _c.target, data_1 = _c.data;
                return [4 /*yield*/, renderFile(resolve("../", "templates", "frontend-server", source), data_1 || {}, {})];
            case 2:
                content = _d.sent();
                writeFileSync(target, content);
                _d.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                console.log(green("Copied template files!\n"));
                _d.label = 5;
            case 5:
                if (!true) return [3 /*break*/, 10];
                _d.label = 6;
            case 6:
                _d.trys.push([6, 7, , 9]);
                // Install dependencies
                console.log(cyan("Installing dependencies..."));
                packageInstaller(projectPath, packageManager, ["cookie-parser", "debug", "express", "express-session", "morgan"]);
                console.log(green("Installed dependencies!\n"));
                // Install development dependencies
                console.log(cyan("Installing development dependencies..."));
                packageInstaller(projectPath, packageManager, [
                    "@babel/core@7.x.x",
                    "@babel/plugin-transform-react-jsx@7.x.x",
                    "@babel/plugin-transform-spread@7.x.x",
                    "@babel/preset-env@7.x.x",
                    "@babel/preset-react@7.x.x",
                    "@types/react@16.x.x",
                    "@types/react-dom@16.x.x",
                    "@types/react-router-dom@5.x.x",
                    "@types/yup@0.x.x",
                    "@typescript-eslint/eslint-plugin@4.x.x",
                    "@typescript-eslint/parser@4.x.x",
                    "axios@0.x.x",
                    "autoprefixer@8.x.x",
                    "babel-loader@5.x.x",
                    "concurrently@5.x.x",
                    "css-loader@5.x.x",
                    "eslint@7.x.x",
                    "eslint-config-defaults@9.x.x",
                    "eslint-plugin-react@7.x.x",
                    "faker@5.x.x",
                    "file-loader@6.x.x",
                    "formik@2.x.x",
                    "moment@2.x.x",
                    "node-sass@5.x.x",
                    "nodemon@2.x.x",
                    "numeral@2.x.x",
                    "postcss@8.x.x",
                    "postcss-loader@4.x.x",
                    "prettier@2.x.x",
                    "react@16.x.x",
                    "react-dom@16.x.x",
                    "react-router-dom@5.x.x",
                    "react-simple-widgets@3.x.x",
                    "sass-loader@10.x.x",
                    "style-loader@2.x.x",
                    "ts-loader@8.x.x",
                    "typescript@4.x.x",
                    "url-loader@4.x.x",
                    "webpack@5.x.x",
                    "webpack-cli@4.x.x",
                    "yup@0.x.x"
                ], true);
                console.log(green("Installed development dependencies!\n"));
                // TODO: Link to site for next steps and project directory description
                console.log(green("Project setup complete!\n"));
                return [3 /*break*/, 10];
            case 7:
                err_1 = _d.sent();
                console.log(err_1.message);
                return [4 /*yield*/, prompt([
                        { name: "retry", message: "An error occurred while installing dependencies. Would you like to try again?", type: "confirm" }
                    ])];
            case 8:
                answers = _d.sent();
                if (!answers.retry) {
                    console.log(red("Could not install dependencies. Please rerun ") + bgRed(bold("mkts")) + red(" to try again"));
                    destroyDirectory(projectPath);
                    return [3 /*break*/, 10];
                }
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 5];
            case 10: return [2 /*return*/];
        }
    });
}); };
