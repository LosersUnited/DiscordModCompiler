import base_WebpackApi, { WebpackApi } from "./Webpack/index.js";

export { base_WebpackApi, WebpackApi };

export function pathToFunction(path: string) {
    const final: () => any = new Function("return () => " + path)();
    Object.defineProperty(final, "path", {
        value: path,
    });
    return final;
}
