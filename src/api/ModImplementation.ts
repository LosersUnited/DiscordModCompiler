import { Data } from "./modules/Data.js";
import { Patcher } from "./modules/Patcher.js";
import { Ui } from "./modules/Ui.js";
import { Utils } from "./modules/Utils.js";
import { Webpack } from "./modules/Webpack.js";

export interface IModImplementation {
    Webpack: typeof Webpack,
    Data: typeof Data,
    Patcher: typeof Patcher,
    Ui: typeof Ui,
    Utils: typeof Utils,

    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}
