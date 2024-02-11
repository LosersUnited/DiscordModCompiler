import { WebpackApi } from "./Webpack.js";

export interface ModImplementation {
    WebpackApi: typeof WebpackApi,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
