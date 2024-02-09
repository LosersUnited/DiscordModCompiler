import { IBaseWebpackApi, createFunctionFromObjectProperty } from "../api/index.js";
class RPWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return createFunctionFromObjectProperty("replugged.webpack", "getModule");
    }
}
export default {
    WebpackApi: new RPWebpackApi(),
};
