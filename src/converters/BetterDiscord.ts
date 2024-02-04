import { base_WebpackApi, pathToFunction } from "../api/index.js";
class BD_WebpackApi implements base_WebpackApi {
    get getModule() {
        return pathToFunction("BdApi.Webpack.getModule");
    }
};
export default {
    WebpackApi: new BD_WebpackApi(), // :skull:
}; 
