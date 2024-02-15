/**
 * Creates a function from a given path that gets resolved at runtime.
 * @param path - The path to create the function from.
 * @returns The created function.
 */
export function createFunctionFromPath(path: string) {
    const generatedFunction: () => any = new Function("return () => " + path)();
    Object.defineProperty(generatedFunction, "path", {
        value: path,
    });
    return generatedFunction;
}

/**
 * Creates a function that returns the value of a specified property from an object that gets resolved at runtime.
 * @param objectName - The name of the object.
 * @param property - The name of the property.
 * @returns A function that returns the value of the specified property from the object.
 */
export function createFunctionFromObjectProperty(objectName: string, property: string) {
    const generatedFunction: (...args: any[]) => any = new Function(`return () => ${objectName}.${property}`)();
    Object.defineProperty(generatedFunction, "object", {
        value: objectName,
    });
    Object.defineProperty(generatedFunction, "property", {
        value: property,
    });
    return generatedFunction;
}

import { FunctionImplementation, implementationStores, initStores } from "../common/index.js";
import { createJavaScriptFromObject } from "../utils.js";
import { parse } from "@babel/parser";
/**
 * this is really wrong, TODO: fix this piece of... garbage
 */
export async function addCode() {
    // let rawCode = "globalThis.implementationStores = {\n"; // TODO: fix, this is awful
    // for (const key in implementationStores) {
    //     if (Object.prototype.hasOwnProperty.call(implementationStores, key)) {
    //         const element = implementationStores[key].implementationStore;
    //         rawCode += `\t${key}: {\n`;
    //         for (const key2 in element) {
    //             if (Object.prototype.hasOwnProperty.call(element, key2)) {
    //             }
    //         }
    //     }
    // }
    await initStores();
    const constructed: {
        [key: string]: {
            [key: string]: FunctionImplementation;
            // [key: string]: string;
        }
        // [key: string]: string,
    } = {};
    for (const key in implementationStores) {
        if (Object.prototype.hasOwnProperty.call(implementationStores, key)) {
            constructed[key] = {
                ...implementationStores[key].implementationStore,
            };
            // constructed[key] = {};
            // for (const key2 in implementationStores[key].implementationStore) {
            //     if (Object.prototype.hasOwnProperty.call(implementationStores[key].implementationStore, key2)) {
            //         const element = implementationStores[key].implementationStore[key2];
            //         constructed[key][key2] = getMain(serializer).serialize(element);
            //     }
            // }
        }
    }
    // const rawCode = "globalThis.implementationStores = {\n" + getMain(serializer).serialize(constructed) + "\n}";
    const rawCode = "globalThis.implementationStores = (" + createJavaScriptFromObject(constructed, true) + ")";
    // console.log(rawCode);
    const rawCodeAst = parse(rawCode);
    return rawCodeAst.program.body;
}
