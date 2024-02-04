import { ParseResult } from "@babel/parser";
import { File, ImportDeclaration, ImportSpecifier, Statement } from "@babel/types";
import { readFileSync } from "fs";

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

function removeASTLocation(ast: Statement[] | Statement) {
    if (Array.isArray(ast)) {
        ast.forEach(a => removeASTLocation(a));
    } else if (typeof ast === 'object' && ast !== null) {
        delete ast['loc'];
        delete ast['start'];
        delete ast['end'];
        const values = Object.values(ast).filter(v => Array.isArray(v) || typeof v === 'object');
        removeASTLocation(values);
    }
};

export default function (ast: ParseResult<File>): Statement[] {
    const parsedBody = ast.program.body;
    const importStatements = parsedBody.filter(x => x.type == "ImportDeclaration");
    const importsToBake = [];
    console.log(importStatements);
    removeASTLocation(importStatements);
    for (let index = 0; index < importStatements.length; index++) {
        const element = importStatements[index] as ImportDeclaration;
        const spec = element.specifiers[0] as ImportSpecifier;
        // spec.local.name = "test_"; // alias
        // // @ts-ignore
        // spec.imported.name = "test"; // imported value
        // debugger;
        if (element.source.value == JSON.parse(readFileSync(__dirname + "../package.json", "utf8")).name)
            importsToBake.push(spec.local.name);
    }
    return parsedBody;
}
