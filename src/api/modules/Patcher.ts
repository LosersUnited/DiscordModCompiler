/* eslint-disable @typescript-eslint/no-unused-vars */
export class BasePatcherApi {
    // Commented out methods are not implemented in Replugged (only for BetterDiscord)

    /**
     * This method patches onto another function, allowing your code to run beforehand.
     * Using this, you are also able to modify the incoming arguments before the original method is run.
     *
     * @param {string} caller Name of the caller of the patch function
     * @param {object} moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param {string} functionName Name of the function to be patched
     * @param {function} callback Function to run before the original method. The function is given the `this` context and the `arguments` of the original function.
     * @returns {function} Function that cancels the original patch
     */
    // get before() : (caller: string, moduleToPatch: object, functionName: string, callback: ()=>void) => ()=>any {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * This method patches onto another function, allowing your code to run instead.
     * Using this, you are able to replace the original completely. You can still call the original manually if needed.
     *
     * @param {string} caller Name of the caller of the patch function
     * @param {object} moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param {string} functionName Name of the function to be patched
     * @param {function} callback Function to run before the original method. The function is given the `this` context, `arguments` of the original function, and also the original function.
     * @returns {function} Function that cancels the original patch
     */
    // get instead() : (caller: string, moduleToPatch: object, functionName: string, callback: ()=>void) => ()=>any {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * This method patches onto another function, allowing your code to run afterwards.
     * Using this, you are able to modify the return value after the original method is run.
     *
     * @param {string} caller Name of the caller of the patch function
     * @param {object} moduleToPatch Object with the function to be patched. Can also be an object's prototype.
     * @param {string} functionName Name of the function to be patched
     * @param {function} callback Function to run after the original method. The function is given the `this` context, the `arguments` of the original function, and the `return` value of the original function.
     * @returns {function} Function that cancels the original patch
     */
    // get after() : (caller: string, moduleToPatch: object, functionName: string, callback: ()=>void) => ()=>any {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Returns all patches by a particular caller. The patches all have an `unpatch()` method.
     *
     * @param {string} caller ID of the original patches
     * @returns {Array<function>} Array of all the patch objects
     */
    // get getPatchesByCaller() : (caller: string) => Array<()=>any> {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Automatically cancels all patches created with a specific ID.
     *
     * @param {string} caller ID of the original patches
     */
    // get unpatchAll() : (caller: string) => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }
}

export const PatcherApi = new BasePatcherApi();
