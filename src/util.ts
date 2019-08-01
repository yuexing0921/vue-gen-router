import chalk from "chalk";

import {
  ensureDir,
  existsSync,
  readFileSync,
  writeFile as feWriteFile
} from "fs-extra";
import { safeLoad } from "js-yaml";

import  * as fspath from "path";

import { format as prettify } from "prettier";

export function format(code: string): string {
  return prettify(code, {
    parser: "typescript",
    printWidth: 80,
    singleQuote: true,
    semi: true,
    tabWidth: 2,
    insertPragma:true,
    bracketSpacing: true,
    useTabs: false
  });
}

export const printError = (msg: string) => {
  console.log();
  console.log(chalk.bgRed(msg));
};

export const loadYaml = (path: string) => {
  if (!existsSync(path)) {
    throw new Error("no such file or directory");
  }

  const yamlFile = readFileSync(path, "utf8");
  return safeLoad(yamlFile);
};

export const writeFile = (dirPath: string,fileName:string, data: string) => {
  const path = fspath.join(dirPath,fileName);

  ensureDir(dirPath, { mode: 0o2775 }).then(() => {
    feWriteFile(path, format(data), { encoding: "utf8" });
  });
};
