import { base_WebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class BD_WebpackApi implements base_WebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("BdApi.Webpack", "getModule");
    }
}
export default {
    WebpackApi: new BD_WebpackApi(), // :skull:
};
