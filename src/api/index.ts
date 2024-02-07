import base_WebpackApi, { WebpackApi } from "./Webpack/index.js";

export { base_WebpackApi, WebpackApi };

export function getFunctionByPath(path: string) {
    const final: () => any = new Function("return () => " + path)();
    Object.defineProperty(final, "path", {
        value: path,
    });
    return final;
}

export function getFunctionByObjectAndProperty(object: string, property: string) {
    const final: () => any = new Function(`return () => ${object}.${property}`)();
    Object.defineProperty(final, "object", {
        value: object,
    });
    Object.defineProperty(final, "property", {
        value: property,
    });
    return final;
}

// export function getFunctionByObjectAndProperty(object: any, property: string) {
//     const final = () => object[property];
//     Object.defineProperty(final, "object", {
//         value: object,
//     });
//     Object.defineProperty(final, "property", {
//         value: property,
//     });
//     return final;
// }