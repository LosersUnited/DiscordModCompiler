import { WebpackApi } from "./Webpack.js";
import { PatcherApi } from "./Patcher.js";

export interface IModImplementation {
    WebpackApi: typeof WebpackApi,
    PatcherApi: typeof PatcherApi.prototype,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
