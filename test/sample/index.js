import { WebpackApi } from "discord-mod-compiler";

/**
 * @name ExamplePlugin
 * @author YourName
 * @description Describe the basic functions. Maybe a support server link.
 * @version 0.0.1
 */

module.exports = class MyPlugin {
    constructor(_meta) {
        // Do stuff in here before starting
    }

    start() {
        const getModuleType1 = WebpackApi.getModule;
        const someModuleType1 = getModuleType1((x) => x._sendMessage);

        const { getModule: getModuleType2 } = WebpackApi;
        const someModuleType2 = getModuleType2((x) => x._sendMessage);

        const someModuleType3 = WebpackApi.getModule((x) => x._sendMessage);

        const modules = [
            getModuleType1,
            someModuleType1,
            getModuleType2,
            someModuleType2,
            someModuleType3,
        ];

        if (modules.includes(undefined)) {
            throw new Error("WebpackApi.getModule is not working");
        } else {
            console.log("WebpackApi.getModule is working");
        }
    }

    stop() {
        // Cleanup when disabled
    }
};
