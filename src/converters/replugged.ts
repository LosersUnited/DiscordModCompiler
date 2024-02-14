import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { BaseDataApi } from "../api/modules/Data.js";
import { BaseWebpackApi } from "../api/modules/Webpack.js";

class RPWebpackApi extends BaseWebpackApi {
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

class RPDataApi extends BaseDataApi {
    get save() {
        return () => {
            throw new Error("Method not implemented.");
        };
    }

    get load() {
        return () => {
            throw new Error("Method not implemented.");
        };
    }

    get delete() {
        return () => {
            throw new Error("Method not implemented.");
        };
    }
}


export default {
    WebpackApi: new RPWebpackApi(),
    Data: new RPDataApi(),
} as IModImplementation;
