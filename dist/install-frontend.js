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
/* This modules installs a frontend app basis at the project directory */
module.exports = function (projectName, packageManager) { return __awaiter(_this, void 0, void 0, function () {
    var resolve, renderFile, _a, writeFileSync, mkdirSync, packageInstaller, projectPath, templateFiles, _i, templateFiles_1, _b, source, target, data, content;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                resolve = require("path").resolve;
                renderFile = require("ejs").renderFile;
                _a = require("fs"), writeFileSync = _a.writeFileSync, mkdirSync = _a.mkdirSync;
                packageInstaller = require("./package-installer");
                projectPath = resolve(process.cwd(), projectName);
                templateFiles = [
                    { source: ".babelrc.js.ejs", target: resolve(projectPath, ".babelrc.js") },
                    { source: ".eslintrc.ejs", target: resolve(projectPath, ".eslintrc") },
                    { source: ".prettierrc.ejs", target: resolve(projectPath, ".prettierrc") },
                    { source: ".gitignore.ejs", target: resolve(projectPath, ".gitignore") },
                    { source: "index.d.ts.ejs", target: resolve(projectPath, "index.d.ts") },
                    { source: "index.html.ejs", target: resolve(projectPath, "index.html"), data: { projectName: projectName } },
                    { source: "package.json.ejs", target: resolve(projectPath, "package.json"), data: { projectName: projectName } },
                    { source: "tsconfig.json.ejs", target: resolve(projectPath, "tsconfig.json") },
                    { source: "webpack.common.js.ejs", target: resolve(projectPath, "webpack.common.js") },
                    { source: "webpack.lib.js.ejs", target: resolve(projectPath, "webpack.lib.js") },
                    { source: "src/index.tsx.ejs", target: resolve(projectPath, "src/index.tsx") },
                    { source: "src/app.tsx.ejs", target: resolve(projectPath, "src/app.tsx"), data: { projectName: projectName } },
                    { source: "src/app.scss.ejs", target: resolve(projectPath, "src/app.scss") }
                ];
                // Create necessary sub folders
                mkdirSync(resolve(projectPath, "src"));
                _i = 0, templateFiles_1 = templateFiles;
                _c.label = 1;
            case 1:
                if (!(_i < templateFiles_1.length)) return [3 /*break*/, 4];
                _b = templateFiles_1[_i], source = _b.source, target = _b.target, data = _b.data;
                return [4 /*yield*/, renderFile(resolve("../", "templates", "frontend", source), data || {}, {})];
            case 2:
                content = _c.sent();
                writeFileSync(target, content);
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                // Install development dependencies
                packageInstaller(projectPath, packageManager, [
                    "@babel/core",
                    "@babel/plugin-transform-react-jsx",
                    "@babel/plugin-transform-spread",
                    "@babel/preset-env",
                    "@babel/preset-react",
                    "@types/react",
                    "@types/react-dom",
                    "@typescript-eslint/eslint-plugin",
                    "@typescript-eslint/parser",
                    "autoprefixer",
                    "babel-loader",
                    "css-loader",
                    "eslint",
                    "eslint-config-defaults",
                    "eslint-plugin-react",
                    "faker",
                    "file-loader",
                    "node-sass",
                    "postcss-loader",
                    "prettier",
                    "react",
                    "react-dom",
                    "sass-loader",
                    "style-loader",
                    "ts-loader",
                    "typescript",
                    "url-loader",
                    "webpack",
                    "webpack-cli"
                ], true);
                return [2 /*return*/];
        }
    });
}); };
