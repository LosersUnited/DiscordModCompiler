import { IBaseWebpackApi, ModImplementation, createFunctionFromObjectProperty } from "../api/index.js";

class BDWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }
}

export default {
    WebpackApi: new BDWebpackApi(),
    importsForbidden: true,
} as ModImplementation;
