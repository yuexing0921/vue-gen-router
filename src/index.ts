/** @format */

import { RouteConfig } from 'vue-router';
import { loadYaml, writeFile } from './util';

export interface CliOption {
  output: string;
  file: string;
  input: string;
  comment: string;
}

export interface YamlData {
  routes: RouteConfig[];
  components?: { [key: string]: string };
}

const renderKeep = (keepStr: string) => {
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

const renderRouterView = () => {
  return `{
    render: () => <router-view />
  }`;
};

const renderRoute = (
  route: RouteConfig,
  components: YamlData['components'],
  isTs: boolean
) => {
  const rs: string[] = [];
  if (!components) {
    components = {};
  }
  for (const r of Object.keys(route)) {
    const key: keyof RouteConfig = r as any;
    const item = route[key];
    let value: string | boolean = `'${item}'`;
    if (typeof item === 'boolean') {
      value = item;
    }

    switch (key) {
      case 'meta':
        value = JSON.stringify(item);
        break;
      case 'component':
        if (item === 'router-view') {
          value = renderRouterView();
        } else if (item.match(/^keep:/)) {
          value = renderKeep(item);
        } else if (components[item]) {
          value = item;
        } else {
          if (isTs) {
            // Why do I need to add @ts-ignore ?
            // https://github.com/vuejs/vue-cli/issues/1198
            // https://github.com/Microsoft/TypeScript/issues/19573
            value = `
            // prettier-ignore
            // @ts-ignore
            ${key}: () => import('${item}')
            `;
            rs.push(value);
            continue;
          } else {
            value = `() => import('${item}')`;
          }
        }
        break;
      case 'children':
        const children: string[] = [];
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

const renderComponents = (c: YamlData['components'], isTs: boolean) => {
  if (!c) {
    return '';
  }
  const imports: string[] = [];
  for (const key of Object.keys(c)) {
    if (isTs) {
      imports.push(`// @ts-ignore // prettier-ignore`);
    }
    imports.push(`import ${key} from '${c[key]}'`);
  }
  return imports.join('\n');
};

const genTs = (opiton: CliOption, importStr: string, routeStr: string) => {
  const code = `

  /**
   * @description ${opiton.comment}
   * @update ${new Date().toString()}
   */

  import { RouteConfig } from 'vue-router'
  
  ${importStr}

  export const routerConfig: RouteConfig[] =[
    ${routeStr}
  ]
  `;
  writeFile(opiton.output, opiton.file, code);
};

const genJs = (opiton: CliOption, importStr: string, routeStr: string) => {
  const code = `
  
  ${importStr}

  export const routerConfig =[
    ${routeStr}
  ]
  `;
  writeFile(opiton.output, opiton.file, code);
};

/**
 * @param opiton
 */
export const run = (opiton: CliOption) => {
  const yamlData: YamlData = loadYaml(opiton.input);

  const routes: string[] = [];

  const isTs: boolean = !!opiton.file.match(/\.tsx?$/) || false;

  yamlData.routes.forEach(k => {
    routes.push('{' + renderRoute(k, yamlData.components, isTs) + '}');
  });
  const importStr = renderComponents(yamlData.components, isTs);

  // console.log(isTs, routes, importStr);
  if (isTs) {
    genTs(opiton, importStr, routes.join());
  } else {
    genJs(opiton, importStr, routes.join());
  }
};
