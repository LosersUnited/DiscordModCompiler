import { IModImplementation } from "../api/ModImplementation.js";
import { createFunctionFromObjectProperty } from "../api/RuntimeGenerators.js";
import { BaseData } from "../api/modules/Data.js";
import { BasePatcher } from "../api/modules/Patcher.js";
import { BaseUi } from "../api/modules/Ui.js";
import { BaseUtils } from "../api/modules/Utils.js";
import { BaseWebpack } from "../api/modules/Webpack.js";

class BDWebpack implements BaseWebpack {
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

class BDData implements BaseData {
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

class BDPatcher implements BasePatcher {
    get before() {
        return createFunctionFromObjectProperty("BdApi.Patcher", "before");
    }

    get instead() {
        return createFunctionFromObjectProperty("BdApi.Patcher", "instead");
    }

    get after() {
        return createFunctionFromObjectProperty("BdApi.Patcher", "after");
    }

    get insteadOf() {
        return createFunctionFromObjectProperty("BdApi.Patcher", "insteadOf");
    }

    get unpatchAll() {
        return createFunctionFromObjectProperty("BdApi.Patcher", "unpatchAll");
    }
}

class BdUi implements BaseUi {
    get alert() {
        return createFunctionFromObjectProperty("BdApi", "alert");
    }

    get createTooltip() {
        return createFunctionFromObjectProperty("BdApi", "createTooltip");
    }

    get showConfirmationModal() {
        return createFunctionFromObjectProperty("BdApi", "showConfirmationModal");
    }

    get showToast() {
        return createFunctionFromObjectProperty("BdApi", "showToast");
    }

    get showNotice() {
        return createFunctionFromObjectProperty("BdApi", "showNotice");
    }

    get openDialog() {
        return createFunctionFromObjectProperty("BdApi", "openDialog");
    }
}

class BdUtils implements BaseUtils {
    get findInTree() {
        return createFunctionFromObjectProperty("BdApi", "findInTree");
    }

    get extend() {
        return createFunctionFromObjectProperty("BdApi", "extend");
    }

    get debounce() {
        return createFunctionFromObjectProperty("BdApi", "debounce");
    }

    get escapeHTML() {
        return createFunctionFromObjectProperty("BdApi", "escapeHTML");
    }

    get className() {
        return createFunctionFromObjectProperty("BdApi", "className");
    }
}

export default {
    Webpack: new BDWebpack(),
    Data: new BDData(),
    Patcher: new BDPatcher(),
    Ui: new BdUi(),
    Utils: new BdUtils(),

    importsForbidden: true,
} as IModImplementation;
