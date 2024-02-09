import { WebpackApi, getFunctionByPath } from "discord-mod-compiler";
import { readFileSync } from "fs";
// import { getFunctionByPath } from "discord-mod-compiler";
function start() {
    // const getModule = WebpackApi.getModule;

    const { getModule } = WebpackApi;
    // const someModule = WebpackApi.getModule(x => x._sendMessage);
    const someModule = getModule(x => x._sendMessage);
}
