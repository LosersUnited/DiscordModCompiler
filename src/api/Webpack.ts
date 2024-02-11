export interface IBaseWebpackApi {
    getModule(filter: (match: any) => boolean): any;
}

class DummyWebpackApi implements IBaseWebpackApi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModule(filter: (match: any) => boolean) {
        throw new Error("Method not implemented. This is a dummy class.");
    }
}

export const WebpackApi = new DummyWebpackApi();