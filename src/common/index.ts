import { IModImplementation } from "../api/ModImplementation";
import { getKeyValue } from "../utils.js";

export interface IFunctionImplementation {
    supplies: string,
    depends: string[],
    data: any,
    func: (...args: any[]) => any,
    isWrapper?: boolean,
}
class FunctionImplementation implements IFunctionImplementation {
    supplies: string;
    depends: string[];
    data: any;
    func: (...args: any[]) => any;
    isWrapper?: boolean | undefined;
    // constructor(supplies: string, depends: string[], data: any, func: (...args: any[]) => any) {
    //     this.supplies = supplies;
    //     this.depends = depends;
    //     this.data = data;
    //     this.func = func;
    // }
    constructor(options: IFunctionImplementation) {
        const { supplies, depends, data, func, isWrapper } = options;
        this.supplies = supplies!;
        this.depends = depends!;
        Object.defineProperty(this, "data", { value: data, enumerable: data !== null });
        this.func = func!;
        // this.isWrapper = isWrapper === true;
        Object.defineProperty(this, "isWrapper", { value: isWrapper, enumerable: isWrapper === true });
    }
}
export {
    FunctionImplementation,
};
// import * as WebpackImplementations from "./Webpack.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { readdirSync } from "fs";
import * as url from 'url';
import * as path from 'path';
import { IMPLEMENTATION_STORES_PATH_SOURCE, IMPLEMENTATION_STORES_PATH_VAR_NAME } from "../constants.js";
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const implementationStores = {
    // "Webpack": WebpackImplementations,
} as { [category: string]: { implementationStore: { [key: string]: FunctionImplementation }, targetMod: IModImplementation } };
export async function initStores() {
    const stores = readdirSync(`${__dirname}`).filter(x => !x.startsWith("index."));
    console.log(stores);
    for (let index = 0; index < stores.length; index++) {
        const filler = import(url.pathToFileURL(`${__dirname}/${stores[index]}`).href);
        const mod = await filler;
        implementationStores[path.parse(stores[index]).name] = mod;
    }
    console.log("done");
}
export function doesImplement(mod: IModImplementation, category: string, method: string) {
    const categoryObj = getKeyValue(mod, category as keyof IModImplementation);
    return getKeyValue(categoryObj, method as never) != undefined;
}

export function __requireInternal(mod: IModImplementation, category: string, method: string, ignoreWrappers: boolean = false) {
    if (doesImplement(mod, category, method)) {
        const categoryObj = getKeyValue(mod, category as keyof IModImplementation);
        const result = getKeyValue(categoryObj, method as never);
        if (ignoreWrappers)
            return result;
        else {
            if (result["wrapperName"]) {
                method = result["wrapperName"];
            }
            else
                return result;
        }
    }
    if (implementationStores[category].targetMod !== undefined)
        implementationStores[category].targetMod = mod;
    const foundImplementation = implementationStores[category].implementationStore[method];
    if (foundImplementation == undefined)
        return null; // depends failed
    return createFunctionFromObjectProperty(`${IMPLEMENTATION_STORES_PATH_SOURCE}.${IMPLEMENTATION_STORES_PATH_VAR_NAME}.${category}`, method);
}
