export default interface base_WebpackApi {
    getModule(): any;
};
class WebpackApi_c implements base_WebpackApi {
    getModule() {
        throw new Error("Method not implemented. This is a dummy class.");
    }
}
export const WebpackApi = new WebpackApi_c(); // ts stupid
