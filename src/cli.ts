import { parse } from "@babel/parser";
import { default as generate_ } from "@babel/generator";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import * as url from 'url';
import converter from "./converter.js";
import { File } from "@babel/types";
import { getMain, myPackageName } from "./utils.js";
import { transformSync } from "@babel/core";
import { IModImplementation } from "./api/ModImplementation.js";
// import { addCode } from "./api/RuntimeGenerators.js";

if (process.argv[5] != undefined && process.argv[5] !== "--entrypoint") {
    console.error(`Usage:\n\t${myPackageName} <input file> <target client mod> <output file> --entrypoint\nExample:\n\t${myPackageName} ./index.js BetterDiscord ./dist/index.js --entrypoint`);
    process.exit(1);
}
if (process.argv.length < 5) { // TODO: make a proper option parser
    console.error(`Usage:\n\t${myPackageName} <input file> <target client mod> <output file>\nExample:\n\t${myPackageName} ./index.js BetterDiscord ./dist/index.js`);
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// addCode().then(_ => process.exit(0));
// // process.exit(0);
const filler = import(url.pathToFileURL(`${__dirname}/converters/${targetDiscordMod}.js`).href);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
filler.then(async (x: { default: IModImplementation }) => {
    if (x.default.importsForbidden)
        console.warn('\x1b[33m%s\x1b[0m', `Warning: Target mod ${targetDiscordMod} requires your code to be bundled into single file`);
    const out = await converter(ast as File & { errors: [] }, x, process.argv[5] !== undefined ? process.argv[5] === "--entrypoint" : true);
    const outMod = {
        ...ast,
        program: {
            ...ast.program,
            body: out,
        },
    } as File;
    const generate = getMain(generate_);
    const final = generate(outMod).code;
    console.log("generated code: ", final);
    writeFileSync(process.argv[4], final);
});
