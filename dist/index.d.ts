export interface CliOption {
    output: string;
    file: string;
    input: string;
}
/**
 * @param opiton
 */
export declare const run: (opiton: CliOption) => void;
