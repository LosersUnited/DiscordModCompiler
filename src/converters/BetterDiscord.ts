import { IBaseWebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class BDWebpackApi implements IBaseWebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("BdApi.Webpack", "getModule");
    }
}
export default {
    WebpackApi: new BDWebpackApi(),
};
