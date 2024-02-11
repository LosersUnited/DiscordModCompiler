import { ModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { IBaseWebpackApi } from "../api/Webpack.js";

class RPWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("replugged.webpack", "getModule");
    }
}

export default {
    WebpackApi: new RPWebpackApi(),
} as ModImplementation;
