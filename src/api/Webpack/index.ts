export interface IBaseWebpackApi {
    getModule(filter: (match: any) => boolean): any;
}

class DummyWebpackApi implements IBaseWebpackApi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModule(filter: (match: any) => boolean) {
        throw new Error("Method not implemented. This is a dummy class.");
    }
}

export interface ModImplementation {
    WebpackApi: typeof WebpackApi,
    /**
     * shall be true when a mod requires the Dev to bundle their code into single file
     */
    importsForbidden?: boolean,
}

export const WebpackApi = new DummyWebpackApi();