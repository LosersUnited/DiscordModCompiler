import { IBaseWebpackApi } from "../api/Webpack.js";
import { parse } from "@babel/parser";
import { IBasePatcherApi } from "../api/Patcher.js";
import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty, createFunctionWithWrapperNeeded } from "../api/RuntimeGenerators.js";
import { addComment, assignmentExpression, ClassDeclaration, classExpression, emptyStatement, ExportDefaultDeclaration, identifier, isExportDefaultDeclaration, logicalExpression, memberExpression, removeComments, Statement, toExpression, toStatement, traverse, variableDeclaration, variableDeclarator } from "@babel/types";
import { BV_PATCHER_COMMIT_HASH, BV_PATCHER_SOURCE_URL, VENCORD_PATCHER_GLOBAL_NAME } from "../constants.js";

class VCWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("Vencord.Webpack", "find");
        // return undefined as unknown as any;
        // return createFunctionThatIsMissing();
        // return { wrapperName: "getModule" } as any;
    }
}

class VCPatcherApi implements IBasePatcherApi {
    get constructor_() {
        return createFunctionWithWrapperNeeded(VENCORD_PATCHER_GLOBAL_NAME, "undefined", "Patcher_constructor") as any;
    }
    // constructor() {
    //     return this.constructor_;
    // }
    internalId: undefined;
    get unpatchAll() {
        return createFunctionWithWrapperNeeded(VENCORD_PATCHER_GLOBAL_NAME, "unpatchAll", "unpatchAllWrapper");
    }
    get after() {
        return createFunctionWithWrapperNeeded(VENCORD_PATCHER_GLOBAL_NAME, "after", "afterWrapper");
    }
    get before() {
        return createFunctionWithWrapperNeeded(VENCORD_PATCHER_GLOBAL_NAME, "before", "beforeWrapper");
    }
    get instead() {
        return createFunctionWithWrapperNeeded(VENCORD_PATCHER_GLOBAL_NAME, "instead", "insteadWrapper");
    }
}

export async function convertFormat(ast: Statement[]) {
    const response = await fetch(BV_PATCHER_SOURCE_URL(BV_PATCHER_COMMIT_HASH));
    const parsed = parse((await response.text()).replace("BdApi.Webpack.findByUniqueProperties", "Vencord.Webpack.findByProps"), { sourceType: "module" }).program.body;
    const patcherClass = parsed.find(x => x.type == "ClassDeclaration" && x.id?.name == "Patcher") as ClassDeclaration;
    if (!patcherClass)
        return ast;
    const originalComment = patcherClass.leadingComments;
    traverse(patcherClass, {
        enter(node) {
            removeComments(node);
        },
    });
    // patcherClass.leadingComments = originalComment;
    const memberExpr = memberExpression(identifier("window"), identifier(VENCORD_PATCHER_GLOBAL_NAME));
    const assigExpr = assignmentExpression("=", memberExpr, logicalExpression("??", memberExpr, classExpression(null, null, patcherClass.body)));
    assigExpr.leadingComments = originalComment;
    ast.unshift(toStatement(assigExpr));
    ast.unshift(addComment(emptyStatement(), "leading", " eslint-disable simple-header/header "));

    for (let i = 0; i < ast.length; i++) {
        if (isExportDefaultDeclaration(ast[i])) {
            const exportDefault = ast[i] as ExportDefaultDeclaration;
            const declaration = exportDefault.declaration as ClassDeclaration;
            const variableName = 'defaultExport';
            const varDeclarator = variableDeclarator(identifier(variableName), toExpression(declaration));
            const varDeclaration = variableDeclaration('const', [varDeclarator]);
            ast[i] = varDeclaration;
            const pluginTemplateCode = `
            import definePlugin from "@utils/types";
            import { wreq, beforeInitListeners } from "@webpack";
            if (Array.prototype.find.call([...beforeInitListeners], x => x && x.toString().includes("writeable")) === undefined) {
                beforeInitListeners.add(() => {
                    console.log("Making exports writeable...");
                    if (wreq.d.toString().includes("set:"))
                    {
                        console.log("Already writeable");
                        return;
                    }
                    wreq.d = (target, exports) => {
                        for (const key in exports) {
                            if (!Reflect.has(exports, key)) continue;
                            Object.defineProperty(target, key, {
                                get: () => exports[key](),
                                set: v => { exports[key] = () => v; },
                                enumerable: true,
                                configurable: false
                            });
                        }
                    };
                });
            }
            const thePlugin = {
                name: "${declaration.id?.name}",
                description: "${declaration.id?.name} plugin",
                authors: [
                    {
                        id: 0n,
                        name: "Anonymous"
                    }
                ],
                instance: (() => new ${variableName}())(),
                start() {
                    this.instance.start();
                },
                stop() {
                    this.instance.stop();
                },
            };
            export default definePlugin(thePlugin);`;
            ast.push(...parse(pluginTemplateCode, { sourceType: "module" }).program.body);
            break;
        }
    }
    return ast;
}

export default {
    WebpackApi: new VCWebpackApi(),
    PatcherApi: VCPatcherApi.prototype,
} as IModImplementation;
