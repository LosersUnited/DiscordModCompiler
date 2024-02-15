import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { BaseData } from "../api/modules/Data.js";
import { BasePatcher } from "../api/modules/Patcher.js";
import { BaseUi } from "../api/modules/Ui.js";
import { BaseUtils } from "../api/modules/Utils.js";
import { BaseWebpack } from "../api/modules/Webpack.js";

class RPWebpack implements BaseWebpack {
    // get getAllByKeys() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getAllByKeys");
    // }

    // get getAllByPrototypeKeys() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getAllByPrototypeKeys");
    // }

    // get getAllByRegex() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getAllByRegex");
    // }

    // get getAllByStrings() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getAllByStrings");
    // }

    // get getBulk() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getBulk");
    // }

    get getByKeys() {
        return createFunctionFromObjectProperty("replugged.webpack", "getById");
    }

    // get getByPrototypeKeys() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getByPrototypeKeys");
    // }

    // get getByRegex() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getByRegex");
    // }

    // get getByStrings() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getByStrings");
    // }

    get getModule() {
        return createFunctionFromObjectProperty("replugged.webpack", "getModule");
    }

    // get getModules() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getModules");
    // }

    get getStore() {
        return createFunctionFromObjectProperty("replugged.webpack", "getByStoreName");
    }

    // get getWithKey() {
    //     return createFunctionFromObjectProperty("replugged.webpack", "getWithKey");
    // }

    Filters = {
        get byProps() {
            return createFunctionFromObjectProperty("replugged.webpack.filters", "byProps");
        },
    };
}

class RPData implements BaseData {
    // get save() {

    // }

    // get load() {

    // }

    // get delete() {

    // }
}

class RPPatcher implements BasePatcher {
    // get before() {

    // }

    // get instead() {

    // }

    // get after() {

    // }

    // get getPatchesByCaller() {

    // }

    // get unpatchAll() {

    // }
}

class RpUi implements BaseUi {
}

class RpUtils implements BaseUtils {

}

export default {
    Webpack: new RPWebpack(),
    Data: new RPData(),
    Patcher: new RPPatcher(),
    Ui: new RpUi(),
    Utils: new RpUtils(),
} as IModImplementation;
