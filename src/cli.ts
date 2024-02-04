import { parse } from "@babel/parser";
import { default as generate_ } from "@babel/generator";
import { readFileSync, readdirSync } from "fs";
import * as url from 'url';
import converter from "./converter.js";
import { File } from "@babel/types";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
// if (process.argv.includes("--cli")) {
const supportedClientMods = [...readdirSync(__dirname + "/converters"), "all"];
const code = readFileSync(process.argv[2], "utf8");
const ast = parse(code, { sourceType: "module" });

// const output = generate(
//     ast,
//     {
//         /* options */
//     },
//     // code
// );
// console.log(ast, output);
const targetDiscordMod = process.argv[3] + ".js";
const supported = (sample: string) => supportedClientMods.indexOf(sample) != -1;
if (supported(targetDiscordMod)) {
    const filler = import(__dirname + "/converters/" + targetDiscordMod);
    filler.then((x: any) => {
        // const test = x.WebpackApi.getModule; // this has to be this way, kinda universal
        // console.log(test);
        // ast.program.body
        debugger;
        const out = converter(ast);
        const outMod = {
            ...ast,
            program: {
                ...ast.program,
                body: out
            },
        } as File;
        const generate = typeof generate_ == "function" ? generate_ : (generate_ as { default: typeof generate_ }).default;
        console.log(generate(outMod));
    });
}
// }
