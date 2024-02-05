import { base_WebpackApi, pathToFunction2 } from "../api/index.js";
class BD_WebpackApi implements base_WebpackApi {
    get getModule() {
        return pathToFunction2("BdApi.Webpack", "getModule");
    }
};
export default {
    WebpackApi: new BD_WebpackApi(), // :skull:
}; 
