import { RandomName as Webpack } from "discord-mod-compiler";

function start() {
    const getModuleType1 = Webpack.getModule;
    const someModuleType1 = getModule(x => x._sendMessage);

    const { getModule: getModuleType2 } = Webpack;
    const someModuleType2 = getModuleType2(x => x._sendMessage);

    const someModuleType3 = Webpack.getModule(x => x._sendMessage);

    const modules = [
        getModuleType1,
        someModuleType1,
        getModuleType2,
        someModuleType2,
        someModuleType3
    ]

    console.log(Webpack);
}
