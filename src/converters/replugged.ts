import { base_WebpackApi, getFunctionByObjectAndProperty } from "../api/index.js";
class replugged_WebpackApi implements base_WebpackApi {
    get getModule() {
        return getFunctionByObjectAndProperty("replugged.webpack", "getModule");
    }
}
export default {
    WebpackApi: new replugged_WebpackApi(), // :skull:
};
