/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseWebpackApi {
    // Commented out methods are not implemented in Replugged (only for BetterDiscord)

    /**
     * Finds all modules with a set of properties.
     * @param {...string} props Properties to use to filter modules
     * @return {Any[]}
     */
    // getAllByKeys(...keys: string[]): any;

    /**
     * Finds all modules with a set of properties of its prototype.
     * @param {...string} prototypes Properties to use to filter modules
     * @return {Any[]}
     */
    // getAllByPrototypeKeys(...keys: string[]): any;

    /**
     * Finds all modules using its code.
     * @param {RegEx} regex A regular expression to use to filter modules
     * @param {object} [options] Options to configure the search
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {Boolean} [options.searchExports=false] Whether to execute the filter on webpack exports
     * @return {Any[]}
     */
    // getAllByRegex(regex: string, options?: any): any;

    /**
     * Finds all modules with a set of strings.
     * @param {...String} strings Strings to use to filter modules
     * @return {Any[]}
     */
    // getAllByStrings(...strings: string[]): any;

    /**
     * Finds multiple modules using multiple filters.
     * @memberof Webpack
     * @param {...object} queries Object representing the query to perform
     * @param {function} queries.filter A function to use to filter modules
     * @param {boolean} [queries.first=true] Whether to return only the first matching module
     * @param {boolean} [queries.defaultExport=true] Whether to return default export when matching the default export
     * @param {boolean} [queries.searchExports=false] Whether to execute the filter on webpack exports
     * @return {any}
     */
    // getBulk(...keys: string[]): any;

    /**
     * Finds a single module using its own properties.
     * Kinda Equivalent to getById in Replugged but only for ids?
     * @param {...string} props Properties to use to filter modules
     * @return {Any}
     */
    get getByKeys() : (...keys: string[]) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    /**
     * Finds a single module using properties on its prototype.
     * @param {...string} prototypes Properties to use to filter modules
     * @return {Any}
     */
    // getByPrototypeKeys(...keys: string[]): any;

    /**
     * Finds a module using its code.
     * @param {RegEx} regex A regular expression to use to filter modules
     * @param {object} [options] Options to configure the search
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {Boolean} [options.searchExports=false] Whether to execute the filter on webpack exports
     * @return {Any}
     */
    // getByRegex(regex: string, options?: any): any;
/**
     * Finds all modules with a set of strings.
     * @param {...String} strings Strings to use to filter modules
     * @return {Any[]}
     */
    /**
     * Finds a single module using a set of strings.
     * @param {...String} props Strings to use to filter modules
     * @return {Any}
     */
    // getByStrings(...strings: string[]): any;

    /**
     * Finds a module using a filter function.
     * Same as `getModule` in Replugged
     *
     * @memberof Webpack
     * @param {function} filter A function to use to filter modules. It is given exports, module, and moduleID. Return `true` to signify match.
     * @param {object} [options] Options to configure the search
     * @param {boolean} [options.first=true] Whether to return only the first matching module
     * @param {boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {boolean} [options.searchExports=false] Whether to execute the filter on webpack exports
     * @return {any}
     */
    get getModule() : (filter: (match: any) => boolean, options?: any) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    /**
     * Finds all modules matching a filter function.
     * @param {Function} filter A function to use to filter modules
     * @param {object} [options] Options to configure the search
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {Boolean} [options.searchExports=false] Whether to execute the filter on webpack exports
     * @return {any[]}
     */
    // getModules(filter: (match: any) => boolean, options?: any): any;

    /**
     * Finds an internal Store module using the name.
     * Equivalent to getByStoreName in Replugged
     * @param {String} name Name of the store to find (usually includes "Store")
     * @return {Any}
     */
    get getStore() : (storeName: string) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    /**
     * Searches for a module by value, returns module & matched key. Useful in combination with the Patcher.
     * @param {(value: any, index: number, array: any[]) => boolean} filter A function to use to filter the module
     * @param {object} [options] Set of options to customize the search
     * @param {any} [options.target=null] Optional module target to look inside.
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {Boolean} [options.searchExports=false] Whether to execute the filter on webpack export getters.
     * @return {[Any, string]}
     */
    // getWithKey(key: string, options?: any): any;

    /**
     * Finds a module that is lazily loaded.
     * @memberof Webpack
     * @param {function} filter A function to use to filter modules. It is given exports. Return `true` to signify match.
     * @param {object} [options] Options for configuring the listener
     * @param {AbortSignal} [options.signal] AbortSignal of an AbortController to cancel the promise
     * @param {boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @param {boolean} [options.searchExports=false] Whether to execute the filter on webpack exports
     * @returns {Promise<any>}
     */
    // waitForModule(filter: (match: any) => boolean, options?: any): any;

    Filters = {
        /**
         * Generates a function that filters by the `displayName` property.
         * @param {string} name Name the module should have
         * @returns {function} A filter that checks for a `displayName` match
         */
        // get byDisplayName() : (displayName: string) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a function that filters by a set of properties.
         * @param {...string} keys List of property names
         * @returns {function} A filter that checks for a set of properties
         */
        // get byKeys() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /*
         * @deprecated on betterdiscord, didn't check if it's the same on replugged
         */
        get byProps() : (...props: string[]) => any {
            throw new Error("Method not implemented. This is a dummy class.");
        },

        /*
         * @deprecated on betterdiscord, doesn't exist on replugged
         */
        // get byPrototypeFields() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a function that filters by a set of properties on the object's prototype.
         * @param {...string} props List of property names
         * @returns {function} A filter that checks for a set of properties on the object's prototype.
         */
        // get byPrototypeKeys() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a function that filters by a regex.
         * @param {RegExp} search A RegExp to check on the module
         * @param {function} filter Additional filter
         * @returns {function} A filter that checks for a regex match
         */
        // get byRegex() : (regex: string, options?: any) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a function that filters by a specific internal Store name.
         * @param {string} name Name the store should have
         * @returns {function} A filter that checks for a Store name match
         */
        // get byStoreName() : (storeName: string) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a function that filters by strings.
         * @param {...string} strings A list of strings
         * @returns {function} A filter that checks for a set of strings
         */
        // get byStrings() : (...strings: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        /**
         * Generates a combined function from a list of filters.
         * @param {...function} filters A list of filters
         * @returns {function} Combinatory filter of all arguments
         */
        // get combine() : (...filters: any[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },
    };
}

export const WebpackApi = new BaseWebpackApi();
