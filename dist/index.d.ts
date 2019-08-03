/** @format */
import { RouteConfig } from 'vue-router';
export interface CliOption {
    output: string;
    file: string;
    input: string;
}
export interface YamlData {
    routes: RouteConfig[];
    components?: {
        [key: string]: string;
    };
}
/**
 * @param opiton
 */
export declare const run: (opiton: CliOption) => void;
