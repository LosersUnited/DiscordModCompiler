import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { IBaseWebpackApi } from "../api/Webpack.js";

class BDWebpackApi implements IBaseWebpackApi {
    get getAllByKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByKeys");
    }

    get getAllByPrototypeKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByPrototypeKeys");
    }

    get getAllByRegex() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByRegex");
    }

    get getAllByStrings() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByStrings");
    }

    get getBulk() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getBulk");
    }

    get getByKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByKeys");
    }

    get getByPrototypeKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByPrototypeKeys");
    }

    get getByRegex() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByRegex");
    }

    get getByStrings() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByStrings");
    }

    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }

    get getModules() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModules");
    }

    get getStore() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getStore");
    }

    get getWithKey() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getWithKey");
    }
}

export default {
    WebpackApi: new BDWebpackApi(),
    importsForbidden: true,
} as IModImplementation;
