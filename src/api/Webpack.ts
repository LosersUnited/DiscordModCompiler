/* eslint-disable @typescript-eslint/no-unused-vars */
export interface IBaseWebpackApi {
    // Commented out methods are not implemented in Replugged (only for BetterDiscord)
    // getAllByKeys(...keys: string[]): any;
    // getAllByPrototypeKeys(...keys: string[]): any;
    // getAllByRegex(regex: string, options?: any): any;
    // getAllByStrings(...strings: string[]): any;
    // getBulk(...keys: string[]): any;
    getByKeys(...keys: string[]): any; // Kinda Equivalent to getById in Replugged
    // getByPrototypeKeys(...keys: string[]): any;
    // getByRegex(regex: string, options?: any): any;
    // getByStrings(...strings: string[]): any;
    getModule(filter: (match: any) => boolean, options?: any): any; // Same as getModule in Replugged
    // getModules(filter: (match: any) => boolean, options?: any): any;
    getStore(storeName: string): any; // Equivalento to getByStoreName in Replugged
    // getWithKey(key: string, options?: any): any;


    // Filters: Soon
    // Filters: {
        // byDisplayName: (displayName: string) => any;
        // byKeys: (...keys: string[]) => any;
        // byProps: (...keys: string[]) => any;
        // byPrototypeFields: (...keys: string[]) => any;
        // byPrototypeKeys: (...keys: string[]) => any;
        // byRegex: (regex: string, options?: any) => any;
        // byStoreName: (storeName: string) => any;
        // byStrings: (...strings: string[]) => any;
        // combine: (...filters: any[]) => any;
    // }
}

class DummyWebpackApi implements IBaseWebpackApi {
    // getAllByKeys(...keys: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getAllByPrototypeKeys(...keys: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getAllByRegex(regex: string, options?: any) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getAllByStrings(...strings: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getBulk(...keys: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    getByKeys(...keys: string[]) {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    // getByPrototypeKeys(...keys: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getByRegex(regex: string, options?: any) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // getByStrings(...strings: string[]) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    getModule(filter: (match: any) => boolean) {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    // getModules(filter: (match: any) => boolean) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    getStore(storeName: string) {
        throw new Error("Method not implemented. This is a dummy class.");
    }

    // getWithKey(key: string, options?: any) {
    //     throw new Error("Method not implemented. This is a dummy class.");
    // }

    // Filters = {
    //     byProps: (...keys: string[]) => {
    //         throw new Error("Method not implemented. This is a dummy class.");
    //     }
    // };
}

export const WebpackApi = new DummyWebpackApi();