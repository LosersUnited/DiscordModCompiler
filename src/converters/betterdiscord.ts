import { Statement } from "@babel/types";
import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { IBaseWebpackApi } from "../api/Webpack.js";

class BDWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }
}

export function convertFormat(ast: Statement[]) {
    return ast;
}

export default {
    WebpackApi: new BDWebpackApi(),
    importsForbidden: true,
} as IModImplementation;
