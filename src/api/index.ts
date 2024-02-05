import base_WebpackApi, { WebpackApi } from "./Webpack/index.js";

export { base_WebpackApi, WebpackApi };

export function pathToFunction(path: string) {
    const final: () => any = new Function("return () => " + path)();
    Object.defineProperty(final, "path", {
        value: path,
    });
    return final;
}

export function pathToFunction2(object: string, property: string) {
    const final: () => any = new Function(`return () => ${object}.${property}`)();
    Object.defineProperty(final, "object", {
        value: object,
    });
    Object.defineProperty(final, "property", {
        value: property,
    });
    return final;
}
