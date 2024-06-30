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
export function createFunctionWithWrapperNeeded(objectName: string, property: string, wrapperName: string) {
    const result = createFunctionFromObjectProperty(objectName, property);
    Object.defineProperty(result, "wrapperName", { value: wrapperName });
    return result;
}
export function createFunctionThatIsMissing() {
    const result = new Function(`return () => {throw new Error("Missing");}`)();
    Object.defineProperty(result, "missing", {
        value: true,
    });
    return result;
}

import { FunctionImplementation, __requireInternal, doesImplement, implementationStores, initStores } from "../common/index.js";
import { createJavaScriptFromObject, getKeyValue } from "../utils.js";
import { parse } from "@babel/parser";
import { IModImplementation } from "./ModImplementation.js";
import { IMPLEMENTATION_STORES_PATH_REQ, IMPLEMENTATION_STORES_PATH_SOURCE, IMPLEMENTATION_STORES_PATH_VAR_NAME } from "../constants.js";
/**
 * this is really wrong, TODO: fix this piece of... garbage
 */
export async function addCode(mod: IModImplementation) {
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
            // constructed[key] = {
            //     ...implementationStores[key].implementationStore,
            // };
            constructed[key] = {};
            for (const key2 in implementationStores[key].implementationStore) {
                if (Object.prototype.hasOwnProperty.call(implementationStores[key].implementationStore, key2)) {
                    const element = implementationStores[key].implementationStore[key2];
                    if (doesImplement(mod, key, key2)) continue;
                    if (element.isWrapper === true) {
                        const categoryObj = getKeyValue(mod, key as keyof IModImplementation);
                        const unWrapped = getKeyValue(categoryObj, element.supplies as never) as any;
                        if (unWrapped.wrapperName != key2) continue;
                    }
                    if (element.func.toString().includes(__requireInternal.name)) {
                        // const regex = new RegExp(__requireInternal.name + "\\(([^)]+)\\)", 'g');
                        // const match = element.func.toString().match(regex);
                        // if (!match)
                        //     continue;
                        // const args = match[1].split(',').map(value => value.trim());
                        // args.shift();
                        // console.log(args);
                        // // const constructed2 = element.func.toString().replace(new RegExp(__requireInternal.name + "\\([^,]+,\\s*", 'g'), "globalThis.implementationStores_require(") + "}.func";
                        // // element.func = new Function("return {" + constructed2)();
                        // // element.func = (mod as { [key: string]: any })[args[0]][args[1]];
                        const regexPattern = new RegExp(`${__requireInternal.name}\\(([^)]+)\\)`, "g");
                        let match;
                        while ((match = regexPattern.exec(element.func.toString())) !== null) {
                            const argsStr = match[1];
                            const args = argsStr.split(',').map(x => x.trim()).map(x => x.startsWith("\"") && x.endsWith("\"") ? x.slice(1, -1) : x);
                            args.shift();

                            // const replacement = "globalThis.implementationStores_require(" + someValues.join(",") + ")";
                            // const result = element.func.toString().replace(match[0], replacement);
                            try {
                                const findResult = (mod as { [key: string]: any })[args[0]][args[1]];
                                if (findResult.wrapperName && args[2] != "true") {
                                    args[1] = findResult.wrapperName;
                                    throw new Error();
                                }
                                // const findResult = __requireInternal(mod, args[0], args[1]) as unknown as any;
                                // element.func = findResult;
                                element.func = new Function("return {" + element.func.toString().replace(match[0], `${findResult.object}.${findResult.property}`) + "}.func")();
                            }
                            catch (error) {
                                // console.error(mod, args, error);
                                console.error((mod as { [key: string]: any })[args[0]], (mod as { [key: string]: any })[args[0]][args[1]]);
                                const replacement = `${IMPLEMENTATION_STORES_PATH_SOURCE}.${IMPLEMENTATION_STORES_PATH_REQ}(${IMPLEMENTATION_STORES_PATH_SOURCE}.${IMPLEMENTATION_STORES_PATH_VAR_NAME}["${args[0]}"]["${args[1]}"])`;
                                element.func = new Function("return {" + element.func.toString().replace(match[0], replacement) + "}.func")();
                            }
                        }
                    }
                    constructed[key][key2] = element;
                }
            }
        }
    }
    // const rawCode = "globalThis.implementationStores = {\n" + getMain(serializer).serialize(constructed) + "\n}";
    const req = (target: any) => new Function("return {" + target.func + "}.func" + (target.asImmediatelyInvokedFunctionExpression === "true" ? "();" : ";"))();
    const rawCode =
        `${IMPLEMENTATION_STORES_PATH_SOURCE}.${IMPLEMENTATION_STORES_PATH_VAR_NAME} = (${createJavaScriptFromObject(constructed, true)});
        ${IMPLEMENTATION_STORES_PATH_SOURCE}.${IMPLEMENTATION_STORES_PATH_REQ} = ${req.toString()};`;
    // console.log(rawCode);
    const rawCodeAst = parse(rawCode);
    return rawCodeAst.program.body;
}
