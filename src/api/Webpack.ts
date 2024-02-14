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

export const WebpackApi = new BaseWebpackApi();
