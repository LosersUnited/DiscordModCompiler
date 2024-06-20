import { ClassDeclaration, ClassMethod, ExportDefaultDeclaration, Identifier, Statement } from "@babel/types";
import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { IBaseWebpackApi } from "../api/Webpack.js";
import { parse } from "@babel/parser";

class RPWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("replugged.webpack", "getModule");
    }
}

export function convertFormat(ast: Statement[]) {
    // debugger;
    // need to add this:
    /*
    const instance = new CrossCompiledSample();
    export const start = instance.start.bind(instance);
    export const stop = instance.stop.bind(instance);
    */
    let targetClassName = undefined;
    for (let index2 = 0; index2 < ast.length; index2++) {
        if (ast[index2].type == "ExportDefaultDeclaration") {
            const currentExportDefaultDeclaration = ast[index2] as ExportDefaultDeclaration;
            if (currentExportDefaultDeclaration.declaration.type == "ClassDeclaration") {
                const currentExportedClass = currentExportDefaultDeclaration.declaration as ClassDeclaration;
                if (currentExportedClass.body.body.find(x => ((x as ClassMethod).key as Identifier)?.name == "start")) {
                    targetClassName = currentExportedClass.id?.name;
                    break;
                }
            }
        }
    }
    if (targetClassName != undefined) {
        // const instanceVar = variableDeclaration("const", [
        //     variableDeclarator(identifier("instance"), newExpression(identifier(targetClassName), [])),
        // ]);
        // const exportDeclaration = exportNamedDeclaration(variableDeclaration("const", [
        //     variableDeclarator(identifier("start"), objectExpression()),
        // ]));
        // ast.push(instanceVar);
        ast.push(...parse(`
        const instance = new ${targetClassName}();
        export const start = instance.start.bind(instance);
        export const stop = instance.stop.bind(instance);`, { sourceType: "module" }).program.body);
    }
    return ast;
}

export default {
    WebpackApi: new RPWebpackApi(),
} as IModImplementation;
