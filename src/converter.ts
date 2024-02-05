import { ParseResult } from "@babel/parser";
import { File, ImportDeclaration, ImportSpecifier, Statement } from "@babel/types";
import { myPackageName } from "./utils.js";

function removeASTLocation(ast: Statement[] | Statement) {
    if (Array.isArray(ast)) {
        ast.forEach(a => removeASTLocation(a));
    }
    else if (typeof ast === 'object' && ast !== null) {
        delete ast['loc'];
        delete ast['start'];
        delete ast['end'];
        const values = Object.values(ast).filter(v => Array.isArray(v) || typeof v === 'object');
        removeASTLocation(values);
    }
}

export default function (ast: ParseResult<File>): Statement[] {
    const parsedBody = ast.program.body;
    const importStatements = parsedBody.filter(x => x.type == "ImportDeclaration");
    const importsToBake = [];
    removeASTLocation(importStatements);
    const importsToRemove: number[] = [];
    for (let index = 0; index < importStatements.length; index++) {
        const element = importStatements[index] as ImportDeclaration;
        // spec.local.name = "test_"; // alias
        // // @ts-ignore
        // spec.imported.name = "test"; // imported value
        // debugger;
        if (element.source.value == myPackageName) { // checking if it's the same module as we are
            for (let index2 = 0; index2 < element.specifiers.length; index2++) {
                const spec = element.specifiers[index2] as ImportSpecifier;
                importsToBake.push(spec.local.name); // we'll later watch those for replacement
                importsToRemove.push(index);
            }
        }
    }
    const trueImportsToRemove =
        importStatements.filter((_, index) => importsToRemove.includes(index));
    const parsedBodyWithoutOurImports = parsedBody.filter((item, index) => !trueImportsToRemove.includes(parsedBody[index]));
    for (let index = 0; index < parsedBodyWithoutOurImports.length; index++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const element = parsedBodyWithoutOurImports[index];
        /* TODO: traverse all elements and look for their signature, based on elements of `importsToBake`. If found, replace their object path and property name with the one that gets resolved from the current one
         * Example:
         * WebpackApi.getModule(something) -> "WebpackApi" matches signature of an element from importsToBake array -> import WebpackApi ourselves -> find method getModule -> select replacement based on target client mod -> read target's object path and property name -> replace them
         */
        debugger;
    }
    return parsedBodyWithoutOurImports;
}
