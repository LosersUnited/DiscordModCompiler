import { IBaseWebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class replugged_WebpackApi implements IBaseWebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("replugged.webpack", "getModule");
    }
}
export default {
    WebpackApi: new replugged_WebpackApi(), // :skull:
};
