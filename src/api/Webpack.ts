/* eslint-disable @typescript-eslint/no-unused-vars */
export class BaseWebpackApi {
    // Commented out methods are not implemented in Replugged (only for BetterDiscord)
    // getAllByKeys(...keys: string[]): any;
    // getAllByPrototypeKeys(...keys: string[]): any;
    // getAllByRegex(regex: string, options?: any): any;
    // getAllByStrings(...strings: string[]): any;
    // getBulk(...keys: string[]): any;

    // Kinda Equivalent to getById in Replugged
    get getByKeys() : (...keys: string[]) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    // getByPrototypeKeys(...keys: string[]): any;
    // getByRegex(regex: string, options?: any): any;
    // getByStrings(...strings: string[]): any;

    // Same as getModule in Replugged
    // filter: (match: any) => boolean, options?: any
    get getModule() : (filter: (match: any) => boolean, options?: any) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    // getModules(filter: (match: any) => boolean, options?: any): any;
    // storeName: string
    get getStore() : (storeName: string) => any {
        throw new Error("Method not implemented. This is a dummy class.");
    } // Equivalento to getByStoreName in Replugged
    // getWithKey(key: string, options?: any): any;

    Filters = {
        // get byDisplayName() : (displayName: string) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get byKeys() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        get byProps() : (...props: string[]) => any {
            throw new Error("Method not implemented. This is a dummy class.");
        },

        // get byPrototypeFields() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get byPrototypeKeys() : (...keys: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get byRegex() : (regex: string, options?: any) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get byStoreName() : (storeName: string) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get byStrings() : (...strings: string[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },

        // get combine() : (...filters: any[]) => any {
        //     throw new Error("Method not implemented. This is a dummy class.");
        // },
    };
}

export const WebpackApi = new BaseWebpackApi();
