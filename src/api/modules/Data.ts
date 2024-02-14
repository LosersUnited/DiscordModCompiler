/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseDataApi {
    /**
     * Saves JSON-serializable data.
     *
     * @param {string} pluginName Name of the plugin saving data
     * @param {string} key Which piece of data to store
     * @param {any} data The data to be saved
     */
    // get save() : (pluginName: string, key: string, data: any) => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    /**
     * Loads previously stored data.
     *
     * @param {string} pluginName Name of the plugin loading data
     * @param {string} key Which piece of data to load
     * @returns {any} The stored data
     */
    // get load() : (pluginName: string, key: string) => any {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }


    /**
     * Deletes a piece of stored data. This is different than saving `null` or `undefined`.
     *
     * @param {string} pluginName Name of the plugin deleting data
     * @param {string} key Which piece of data to delete.
     */
    // get delete() : (pluginName: string, key: string) => void {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }
}

export const DataApi = new BaseDataApi();
