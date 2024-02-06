import { base_WebpackApi, pathToFunction2 } from "../api/index.js";
class replugged_WebpackApi implements base_WebpackApi {
    get getModule() {
        return pathToFunction2("replugged.webpack", "getModule");
    }
}
export default {
    WebpackApi: new replugged_WebpackApi(), // :skull:
};
