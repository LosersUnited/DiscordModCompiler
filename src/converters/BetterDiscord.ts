import { IBaseWebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class BD_WebpackApi implements IBaseWebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("BdApi.Webpack", "getModule");
    }
}
export default {
    WebpackApi: new BD_WebpackApi(), // :skull:
};
