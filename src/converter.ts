/* eslint-disable @typescript-eslint/no-unused-vars */
import { ParseResult } from "@babel/parser";
import { File, Identifier, ImportDeclaration, ImportSpecifier, MemberExpression, Statement } from "@babel/types";
import { NonFunctionType, myPackageName } from "./utils.js";
import { ModImplementation } from "./api/index.js";

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

function findPathsToType(options: { targetType: string, obj: Statement[] | Statement }): string[] {
    const results: string[] = [];

    (function findType({
        targetType,
        obj,
        pathToType,
    }: {
        targetType: string;
        obj: Statement | Statement[];
        pathToType?: string;
    }) {
        // const currentPath = pathToType ? `${pathToType}.` : "";
        const currentPath = pathToType || "";

        if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                findType({
                    targetType,
                    obj: item,
                    // pathToType: `${currentPath}[${index}]`,
                    pathToType: `${currentPath}.${index}`,
                });
            });
        }
        else if (typeof obj === 'object' && obj !== null) {
            if (obj.type === targetType) {
                results.push(currentPath);
            }

            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    // // @ts-expect-error Iteration of object's keys
                    // if (Array.isArray(obj[key])) {
                    //     // @ts-expect-error Iteration of object's keys
                    //     for (let j = 0; j < obj[key].length; j++) {
                    //         findType({
                    //             targetType,
                    //             // @ts-expect-error Iteration of object's keys
                    //             obj: obj[key][j],
                    //             pathToType: `${currentPath}${key}[${j}]`,
                    //         });
                    //     }
                    // }
                    // @ts-expect-error Iteration of object's keys
                    if (obj[key] !== null && typeof obj[key] === 'object') {
                        findType({
                            targetType,
                            // @ts-expect-error Iteration of object's keys
                            obj: obj[key],
                            // pathToType: `${currentPath}${key}`,
                            pathToType: `${currentPath}.${key}`,
                        });
                    }
                }
            }
        }
    })(options);

    return results.map(x => x.startsWith(".") ? x.slice(1) : x);
}

function deepFind<K>(obj: any, path: string): K | undefined {
    const paths = path.split('.');
    let current = obj;
    for (let i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined;
        }
        else {
            current = current[paths[i]];
        }
    }
    return current;
}

const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

export default function (ast: ParseResult<File>, targetedDiscordModApiLibrary: { default: ModImplementation }): Statement[] {
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
        // console.log(findAllTypesWithPath(element, "MemberExpression"));
        const paths = findPathsToType({ obj: element, targetType: "MemberExpression" });
        for (let index2 = 0; index2 < paths.length; index2++) {
            const element2 = paths[index2];
            const trueObj = deepFind<MemberExpression>(element, element2);
            console.log(trueObj);
            if (trueObj != undefined && importsToBake.includes((trueObj.object as Identifier).name)) {
                removeASTLocation(trueObj as unknown as Statement);
                const propDesc = Object.getOwnPropertyDescriptor(targetedDiscordModApiLibrary.default, (trueObj.object as Identifier).name as keyof ModImplementation);
                if (!propDesc)
                    continue;
                // const targetClass = targetedDiscordModApiLibrary.default[(trueObj.object as Identifier).name];
                const targetClass: ModImplementation[keyof ModImplementation] = propDesc.value ?? propDesc.get!(); // TODO: don't make value `any`
                if (targetClass == undefined)
                    continue;
                const replacementObject = getKeyValue(targetClass, (trueObj.property as Identifier).name as keyof typeof targetClass) as { object: string, property: string };
                (trueObj.object as Identifier).name = replacementObject.object;
                (trueObj.property as Identifier).name = replacementObject.property;
            }
        }
    }
    return parsedBodyWithoutOurImports;
}
