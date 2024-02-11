import { readFileSync } from "fs";
import * as url from 'url';
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const myPackageName = (() => {
    return JSON.parse(readFileSync(__dirname + "../package.json", "utf8")).name as string;
})();

// eslint-disable-next-line @typescript-eslint/ban-types
export type NonFunctionType<T> = T extends Function ? never : T;
