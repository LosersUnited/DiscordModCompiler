import { DataApi } from "./modules/Data.js";
import { PatcherApi } from "./modules/Patcher.js";
import { WebpackApi } from "./modules/Webpack.js";

export interface IModImplementation {
    WebpackApi: typeof WebpackApi,
    DataApi: typeof DataApi,
    PatcherApi: typeof PatcherApi,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
