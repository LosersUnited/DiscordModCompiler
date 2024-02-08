import IBaseWebpackApi, { WebpackApi } from "./Webpack/index.js";

export { IBaseWebpackApi, WebpackApi };

export function getFunctionByPath(path: string) {
    const final: () => any = new Function("return () => " + path)();
    Object.defineProperty(final, "path", {
        value: path,
    });
    return final;
}

export function getFunctionByObjectAndProperty(objectName: string, property: string) {
    const final: () => any = new Function(`return () => ${objectName}.${property}`)();
    Object.defineProperty(final, "object", {
        value: objectName,
    });
    Object.defineProperty(final, "property", {
        value: property,
    });
    return final;
}