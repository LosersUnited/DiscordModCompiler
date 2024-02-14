import { WebpackApi } from "./modules/Webpack.js";

export interface IModImplementation {
    WebpackApi: typeof WebpackApi,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
