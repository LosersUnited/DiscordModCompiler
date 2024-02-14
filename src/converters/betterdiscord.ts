import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { BaseDataApi } from "../api/modules/Data.js";
import { BaseWebpackApi } from "../api/modules/Webpack.js";

class BDWebpackApi extends BaseWebpackApi {
    get getAllByKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByKeys");
    }

    get getAllByPrototypeKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByPrototypeKeys");
    }

    get getAllByRegex() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByRegex");
    }

    get getAllByStrings() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getAllByStrings");
    }

    get getBulk() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getBulk");
    }

    get getByKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByKeys");
    }

    get getByPrototypeKeys() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByPrototypeKeys");
    }

    get getByRegex() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByRegex");
    }

    get getByStrings() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getByStrings");
    }

    get getModule() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModule");
    }

    get getModules() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getModules");
    }

    get getStore() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getStore");
    }

    get getWithKey() {
        return createFunctionFromObjectProperty("BdApi.Webpack", "getWithKey");
    }

    Filters = {
        get byDisplayName() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byDisplayName");
        },

        get byKeys() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byKeys");
        },

        get byProps() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byProps");
        },

        get byPrototypeFields() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byPrototypeFields");
        },

        get byPrototypeKeys() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byPrototypeKeys");
        },

        get byRegex() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byRegex");
        },

        get byStoreName() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byStoreName");
        },

        get byStrings() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "byStrings");
        },

        get combine() {
            return createFunctionFromObjectProperty("BdApi.Webpack.Filters", "combine");
        },
    };
}

class BDDataApi extends BaseDataApi {
    get save() {
        return createFunctionFromObjectProperty("BdApi.Data", "save");
    }

    get load() {
        return createFunctionFromObjectProperty("BdApi.Data", "load");
    }

    get delete() {
        return createFunctionFromObjectProperty("BdApi.Data", "delete");
    }
}

export default {
    WebpackApi: new BDWebpackApi(),
    DataApi: new BDDataApi(),

    importsForbidden: true,
} as IModImplementation;
