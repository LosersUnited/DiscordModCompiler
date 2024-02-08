interface IBaseWebpackApi {
    getModule(filter: (match: any) => boolean): any;
}
export default IBaseWebpackApi;
class WebpackApi_c implements IBaseWebpackApi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModule(filter: (match: any) => boolean) {
        throw new Error("Method not implemented. This is a dummy class.");
    }
}
export const WebpackApi = new WebpackApi_c(); // ts stupid
