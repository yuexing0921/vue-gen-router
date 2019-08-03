"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const renderKeep = (keepStr) => {
    const keeps = keepStr.split(':');
    return `{
    render: () => (
      <keep-alive include="${keeps[1]}">
        <router-view />
      </keep-alive>
    )
  }
`;
};
const renderRoute = (route, components, isTs) => {
    const rs = [];
    if (!components) {
        components = {};
    }
    for (const r of Object.keys(route)) {
        const key = r;
        const item = route[key];
        let value = `'${item}'`;
        switch (key) {
            case 'meta':
                value = JSON.stringify(item);
                break;
            case 'component':
                if (item.match(/^keep/)) {
                    value = renderKeep(item);
                }
                else if (components[item]) {
                    value = item;
                }
                else {
                    if (isTs) {
                        // Why do I need to add @ts-ignore ?
                        // https://github.com/vuejs/vue-cli/issues/1198
                        // https://github.com/Microsoft/TypeScript/issues/19573
                        value = `
            // @ts-ignore
            ${key}: () => import('${item}')
            `;
                        rs.push(value);
                        continue;
                    }
                    else {
                        value = `() => import('${item}')`;
                    }
                }
                break;
            case 'children':
                const children = [];
                route[r].forEach(element => {
                    children.push(`{${renderRoute(element, components, isTs)}}`);
                });
                value = `[${children}]`;
                break;
        }
        rs.push(`${key}:${value}`);
    }
    return rs.join();
};
const renderComponents = (c, isTs) => {
    if (!c) {
        return '';
    }
    const imports = [];
    for (const key of Object.keys(c)) {
        if (isTs) {
            imports.push(`// @ts-ignore`);
        }
        imports.push(`import ${key} from '${c[key]}'`);
    }
    return imports.join('\n');
};
const genTs = (opiton, importStr, routeStr) => {
    const code = `
  import { RouteConfig } from 'vue-router'
  
  ${importStr}

  export const routerConfig: RouteConfig[] =[
    ${routeStr}
  ]
  `;
    util_1.writeFile(opiton.output, opiton.file, code);
};
const genJs = (opiton, importStr, routeStr) => {
    const code = `
  
  ${importStr}

  export const routerConfig =[
    ${routeStr}
  ]
  `;
    util_1.writeFile(opiton.output, opiton.file, code);
};
/**
 * @param opiton
 */
exports.run = (opiton) => {
    const yamlData = util_1.loadYaml(opiton.input);
    const routes = [];
    const isTs = !!opiton.file.match(/\.tsx?$/) || false;
    yamlData.routes.forEach(k => {
        routes.push('{' + renderRoute(k, yamlData.components, isTs) + '}');
    });
    const importStr = renderComponents(yamlData.components, isTs);
    // console.log(isTs, routes, importStr);
    if (isTs) {
        genTs(opiton, importStr, routes.join());
    }
    else {
        genJs(opiton, importStr, routes.join());
    }
};
//# sourceMappingURL=index.js.map