import { WebpackApi } from "discord-mod-compiler";

function start() {
    const getModuleType1 = WebpackApi.getModule;
    const someModuleType1 = getModule(x => x._sendMessage);

    const { getModule: getModuleType2 } = WebpackApi;
    const someModuleType2 = getModuleType2(x => x._sendMessage);
    
    const someModuleType3 = WebpackApi.getModule(x => x._sendMessage);

    const modules = [
        getModuleType1,
        someModuleType1,
        getModuleType2,
        someModuleType2,
        someModuleType3
    ]

    if (modules.any(x => x === undefined)) {
        throw new Error("WebpackApi.getModule is not working");
    } else {
        console.log("WebpackApi.getModule is working");
    }
}
