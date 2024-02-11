import { parse } from "@babel/parser";
import { default as generate_ } from "@babel/generator";
import { readFileSync, readdirSync } from "fs";
import * as url from 'url';
import converter from "./converter.js";
import { File } from "@babel/types";
import { myPackageName } from "./utils.js";
import { transformSync } from "@babel/core";
import { ModImplementation } from "./api/index.js";

if (process.argv.length != 4) {
    console.log("Usage:\n\t" + myPackageName + " <input file> <target client mod>\nExample:\n\t" + myPackageName + " ./index.js BetterDiscord");
    process.exit(1);
}

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const supportedClientMods = [...readdirSync(`${__dirname}/converters`), "all"].map(x => x.toLowerCase().replace(/\.js$/, ""));
const code = readFileSync(process.argv[2], "utf8");
const codeMod = transformSync(code, {
    plugins: [
        "@babel/plugin-transform-destructuring",
    ],
})?.code;
if (!codeMod) {
    process.exit(1);
}
console.log("codeMod:", codeMod);
const ast = parse(codeMod, { sourceType: "module" });
// const ast = transformSync(code, { plugins: ["@babel/plugin-transform-destructuring"], sourceType: "module" })?.ast;
// if (!ast) {
//     process.exit(1);
// }
// console.log(ast.errors);
const targetDiscordMod = process.argv[3].toLowerCase();
const isClientModSupported = supportedClientMods.indexOf(targetDiscordMod) != -1;

if (!isClientModSupported) {
    console.error("Unsupported client mod: " + process.argv[3]);
    console.error("Supported client mods: " + supportedClientMods.join(", "));
    process.exit(1);
}

const filler = import(url.pathToFileURL(`${__dirname}/converters/${targetDiscordMod}.js`).href);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
filler.then((x: { default: ModImplementation }) => {
    const out = converter(ast as File & { errors: [] }, x);
    const outMod = {
        ...ast,
        program: {
            ...ast.program,
            body: out,
        },
    } as File;
    const generate = typeof generate_ == "function" ? generate_ : (generate_ as { default: typeof generate_ }).default;
    console.log("generated code: ", generate(outMod).code);
});
