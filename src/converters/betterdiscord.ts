import { Statement } from "@babel/types";
import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty, createFunctionWithWrapperNeeded } from "../api/RuntimeGenerators.js";
import { IBaseWebpackApi } from "../api/Webpack.js";
import { IBasePatcherApi } from "../api/Patcher.js";

class BDWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }
}

class BDPatcherApi implements IBasePatcherApi {
    get constructor_() {
        return createFunctionWithWrapperNeeded("undefined", "undefined", "Patcher_constructor") as any;
    }
    internalId!: string;
    get unpatchAll() {
        return createFunctionWithWrapperNeeded("BdApi.Patcher", "unpatchAll", "unpatchAllWrapper");
    }
    get after() {
        return createFunctionWithWrapperNeeded("BdApi.Patcher", "after", "afterWrapper");
    }
    get before() {
        return createFunctionWithWrapperNeeded("BdApi.Patcher", "before", "beforeWrapper");
    }
    get instead() {
        return createFunctionWithWrapperNeeded("BdApi.Patcher", "instead", "insteadWrapper");
    }
}

export function convertFormat(ast: Statement[]) {
    return ast;
}

export default {
    WebpackApi: new BDWebpackApi(),
    PatcherApi: BDPatcherApi.prototype,
    importsForbidden: true,
} as IModImplementation;
