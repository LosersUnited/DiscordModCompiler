/**
 * Creates a function from a given path that gets resolved at runtime.
 * @param path - The path to create the function from.
 * @returns The created function.
 */
export function createFunctionFromPath(path: string) {
    const generatedFunction: () => any = new Function("return () => " + path)();
    Object.defineProperty(generatedFunction, "path", {
        value: path,
    });
    return generatedFunction;
}

/**
 * Creates a function that returns the value of a specified property from an object that gets resolved at runtime.
 * @param objectName - The name of the object.
 * @param property - The name of the property.
 * @returns A function that returns the value of the specified property from the object.
 */
export function createFunctionFromObjectProperty(objectName: string, property: string) {
    const generatedFunction: () => any = new Function(`return () => ${objectName}.${property}`)();
    Object.defineProperty(generatedFunction, "object", {
        value: objectName,
    });
    Object.defineProperty(generatedFunction, "property", {
        value: property,
    });
    return generatedFunction;
}