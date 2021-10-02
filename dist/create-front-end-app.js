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
exports.createFrontEndApp = void 0;
var create_app_1 = require("./create-app");
var path_1 = require("path");
var install_dependencies_1 = require("./install-dependencies");
var createFrontEndApp = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, create_app_1.createApp)(name, (0, path_1.resolve)(__dirname, "../templates/front-end"), ["dist"])];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, install_dependencies_1.installDependencies)(name, [
                        "axios",
                        "connect-redis",
                        "cookie-parser",
                        "debug",
                        "dotenv",
                        "ejs",
                        "express",
                        "express-favicon",
                        "express-session",
                        "http-errors",
                        "moment",
                        "morgan",
                        "numeral",
                        "redis"
                    ], [
                        "@babel/core",
                        "@babel/plugin-transform-spread",
                        "@babel/preset-env",
                        "@types/bcryptjs",
                        "@types/connect-redis",
                        "@types/cookie-parser",
                        "@types/csurf",
                        "@types/debug",
                        "@types/express",
                        "@types/express-session",
                        "@types/morgan",
                        "@types/node",
                        "@types/numeral",
                        "@types/react",
                        "@types/react-dom",
                        "@types/react-router-dom",
                        "@types/redis",
                        "@types/webpack",
                        "@typescript-eslint/eslint-plugin",
                        "@typescript-eslint/parser",
                        "autoprefixer",
                        "babel-loader",
                        "concurrently",
                        "css-loader",
                        "eslint",
                        "eslint-config-defaults",
                        "eslint-plugin-react",
                        "file-loader",
                        "formik",
                        "node-sass",
                        "nodemon",
                        "postcss",
                        "postcss-loader",
                        "prettier",
                        "react",
                        "react-dom",
                        "react-router-dom",
                        "react-simple-widgets",
                        "sass-loader",
                        "style-loader",
                        "ts-loader",
                        "typescript",
                        "url-loader",
                        "webpack",
                        "webpack-cli",
                        "yup"
                    ])];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createFrontEndApp = createFrontEndApp;
