"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const fs_extra_1 = require("fs-extra");
const js_yaml_1 = require("js-yaml");
const fspath = require("path");
const prettier_1 = require("prettier");
function format(code) {
    return prettier_1.format(code, {
        parser: 'typescript',
        printWidth: 80,
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        insertPragma: true,
        bracketSpacing: true,
        useTabs: false
    });
}
exports.format = format;
exports.printError = (msg) => {
    console.log();
    console.log(chalk_1.default.bgRed(msg));
};
exports.loadYaml = (path) => {
    if (!fs_extra_1.existsSync(path)) {
        throw new Error('no such file or directory');
    }
    const yamlFile = fs_extra_1.readFileSync(path, 'utf8');
    return js_yaml_1.safeLoad(yamlFile);
};
exports.writeFile = (dirPath, fileName, data) => {
    const path = fspath.join(dirPath, fileName);
    fs_extra_1.ensureDir(dirPath, { mode: 0o2775 }).then(() => {
        fs_extra_1.writeFile(path, format(data), { encoding: 'utf8' });
    });
};
//# sourceMappingURL=util.js.map