
import {RouteConfig} from "vue-router";
import { loadYaml ,writeFile} from "./util";





// console.log(loadYaml(yamlPath))

export interface CliOption {
  output:string
  file:string
  input:string

}



const renderRoute = (route:RouteConfig,isTs:boolean)=>{

  const rs:string[] = []
 
  for(const r of Object.keys(route)){
    const key:keyof RouteConfig = r as any;
    switch(key){
      case "meta":
          rs.push(`${r}:${JSON.stringify(route[r])}`)
          break;
      case "component":
          rs.push(`${r}:import('${route[r]}')`)
          break;
      case "children":
          const children:string[] = []
          route[r].forEach(element => {
            children.push(`{${renderRoute(element,isTs)}}`)
          });
          rs.push(`${r}:[${children}]`)
          break;
      default:
          rs.push(`${r}:'${route[r]}'`)
          break;
    }
  }
  return rs.join()
}

const genTs = (opiton: CliOption,str:string)=>{
  const code = `
  import { RouteConfig } from 'vue-router'

  export const routerConfig: RouteConfig[] =[
    ${str}
  ]
  `
  writeFile(opiton.output,opiton.file,code );

}

/**
 * @param opiton 
 */
export const run = (opiton: CliOption) => {
  console.log(opiton)
  
  const yamlData:RouteConfig[] = loadYaml(opiton.input);

  const routers:string[]= [];

  const isTs:boolean = !!opiton.file.match(/\.tsx?$/) || false
  
  
  yamlData.forEach(k => {
    routers.push('{' + renderRoute(k,isTs) + '}')
  })
  genTs(opiton,routers.join());
};
