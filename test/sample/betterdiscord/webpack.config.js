const path = require("path");
module.exports = {
    mode: "development",
    target: "node",
    devtool: false,
    entry: "./index.js",
    output: {
        filename: "MyPlugin.plugin.js",
        path: path.join(__dirname, "dist"),
        libraryTarget: "commonjs2",
        libraryExport: "default",
        compareBeforeEmit: false
    },
    resolve: {
        extensions: [".js"],
    },
};
