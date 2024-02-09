import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators/index.js";
import { IBaseWebpackApi, ModImplementation } from "../api/Webpack/index.js";

class BDWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }
}

export default {
    WebpackApi: new BDWebpackApi(),
    importsForbidden: true,
} as ModImplementation;
