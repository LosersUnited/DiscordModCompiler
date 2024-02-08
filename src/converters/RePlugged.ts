import { IBaseWebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class RPWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("replugged.webpack", "getModule");
    }
}
export default {
    WebpackApi: new RPWebpackApi(),
};
