import { IModImplementation } from "../api/ModImplementation";
import { getKeyValue } from "../utils.js";

export interface IFunctionImplementation {
    supplies: string,
    depends: string[],
    data: any,
    func: (...args: any[]) => any,
}
class FunctionImplementation implements IFunctionImplementation {
    supplies: string;
    depends: string[];
    data: any;
    func: (...args: any[]) => any;
    // constructor(supplies: string, depends: string[], data: any, func: (...args: any[]) => any) {
    //     this.supplies = supplies;
    //     this.depends = depends;
    //     this.data = data;
    //     this.func = func;
    // }
    constructor(options: IFunctionImplementation) {
        const { supplies, depends, data, func } = options;
        this.supplies = supplies!;
        this.depends = depends!;
        this.data = data!;
        this.func = func!;
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

export function require(mod: IModImplementation, category: string, method: string) {
    if (doesImplement(mod, category, method)) {
        const categoryObj = getKeyValue(mod, category as keyof IModImplementation);
        return getKeyValue(categoryObj, method as never);
    }
    implementationStores[category].targetMod = mod;
    const foundImplementation = implementationStores[category].implementationStore[method];
    if (foundImplementation == undefined)
        return null; // depends failed
    return createFunctionFromObjectProperty(`globalThis.implementationStores.${category}`, method); // this hurts me
}
