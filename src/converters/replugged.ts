import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators/index.js";
import { IBaseWebpackApi, ModImplementation } from "../api/Webpack/index.js";

class RPWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("replugged.webpack", "getModule");
    }
}

export default {
    WebpackApi: new RPWebpackApi(),
} as ModImplementation;
