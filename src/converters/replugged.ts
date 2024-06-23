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
    let targetClassName = undefined;
    for (const astNode of ast) {
        if (astNode.type !== "ExportDefaultDeclaration") continue;
        const exportDeclaration = astNode as ExportDefaultDeclaration;
        if (exportDeclaration.declaration.type !== "ClassDeclaration") continue;
        const exportedClass = exportDeclaration.declaration as ClassDeclaration;
        const hasStartMethod = exportedClass.body.body.some(
            (method) => ((method as ClassMethod).key as Identifier)?.name === "start",
        );
        if (!hasStartMethod) continue;
        targetClassName = exportedClass.id?.name;
        break;
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
