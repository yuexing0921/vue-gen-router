"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const renderRoute = (route, isTs) => {
    const rs = [];
    for (const r of Object.keys(route)) {
        const key = r;
        switch (key) {
            case "meta":
                rs.push(`${r}:${JSON.stringify(route[r])}`);
                break;
            case "component":
                rs.push(`${r}:import('${route[r]}')`);
                break;
            case "children":
                const children = [];
                route[r].forEach(element => {
                    children.push(`{${renderRoute(element, isTs)}}`);
                });
                rs.push(`${r}:[${children}]`);
                break;
            default:
                rs.push(`${r}:'${route[r]}'`);
                break;
        }
    }
    return rs.join();
};
const genTs = (opiton, str) => {
    const code = `
  import { RouteConfig } from 'vue-router'

  export const routerConfig: RouteConfig[] =[
    ${str}
  ]
  `;
    util_1.writeFile(opiton.output, opiton.file, code);
};
/**
 * @param opiton
 */
exports.run = (opiton) => {
    console.log(opiton);
    const yamlData = util_1.loadYaml(opiton.input);
    const routers = [];
    const isTs = !!opiton.file.match(/\.tsx?$/) || false;
    yamlData.forEach(k => {
        routers.push('{' + renderRoute(k, isTs) + '}');
    });
    genTs(opiton, routers.join());
};
//# sourceMappingURL=index.js.map