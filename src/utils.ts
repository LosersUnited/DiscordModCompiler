import { readFileSync } from "fs";
import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const myPackageName = (() => {
    return JSON.parse(readFileSync(__dirname + "../package.json", "utf8")).name as string;
})();

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonFunctionType<T> = T extends Function ? never : T;
// eslint-disable-next-line @typescript-eslint/ban-types
export type OnlyFunctionType<T> = T extends Function ? T : never;
export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
// eslint-disable-next-line @typescript-eslint/ban-types
export const getMain = <T>(t: T | { default: T }) => (typeof t == "function" ? t : (t as { default: T }).default);
export function escapeJsonString(str: string) {
    return str.replace(/["\\]/g, '\\$&')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\f/g, '\\f');
}
/**
 * this function tries to create valid JSON with functions embedded
 */
export function createJavaScriptFromObject(obj_: any, intend = false) {
    const tree = [
        "{",
    ];
    const tree_Tabs = [0];
    function enumerateObject(obj: any, tabOffset = 0, iter = 0) {
        if (obj === null) {
            return;
        }
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                enumerateObject(obj[i], tabOffset, iter + 1);
            }
        }
        else if (typeof obj === 'object') {
            for (const key in obj) {
                const descriptor = Object.getOwnPropertyDescriptor(obj, key);
                if (descriptor && (descriptor.get || descriptor.set)) {
                    console.log(`Property ${key} is a getter/setter.`);
                }
                else {
                    tree.push(key + ": ");
                    tree_Tabs.push(tabOffset);
                    if (typeof obj[key] === 'object') {
                        // console.log(`Object ${key}:`);
                        const isArray = Array.isArray(obj[key]);
                        if (isArray) {
                            tree.push("[");
                            tree_Tabs.push(tabOffset);
                        }
                        else {
                            tree.push("{");
                            tree_Tabs.push(tabOffset);
                        }
                        enumerateObject(obj[key], tabOffset + 1, iter + 1);
                        if (isArray) {
                            tree.push("],");
                            tree_Tabs.push(tabOffset);
                        }
                        else {
                            tree.push("},");
                            tree_Tabs.push(tabOffset);
                        }
                    }
                    else {
                        // console.log(`Key: ${key}, Value: ${obj[key]}`);
                        // tree.push(`"${obj[key]}",`.replace(/\n/g, "\\n"));
                        tree.push("\"" + escapeJsonString(`${obj[key]}`) + "\",");
                        tree_Tabs.push(tabOffset + 1);
                    }
                }
            }
        }
        else {
            tree.push(`"${obj}",`.replace(/\n/g, "\\n"));
            tree_Tabs.push(tabOffset);
        }
    }
    enumerateObject(obj_, 1);
    tree.push("}");
    tree_Tabs.push(0);
    // console.log(tree);
    if (!intend) {
        return tree.join("\n");
    }
    const final = [];
    for (let index = 0; index < tree.length; index++) {
        final.push(new Array(tree_Tabs[index]).fill("\t").join("") + tree[index]);
    }
    return final.join("\n");
}
