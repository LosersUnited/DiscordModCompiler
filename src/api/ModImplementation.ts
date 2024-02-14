import { DataApi } from "./modules/Data.js";
import { WebpackApi } from "./modules/Webpack.js";

export interface IModImplementation {
    WebpackApi: typeof WebpackApi,
    Data: typeof DataApi,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
