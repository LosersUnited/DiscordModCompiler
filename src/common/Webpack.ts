import { FunctionImplementation, require } from "./index.js";
import { IModImplementation } from "../api/ModImplementation";

// const reservedData = {} as { [key: string]: any };

export let targetMod: IModImplementation;

const implementationStore = {
    getModule: new FunctionImplementation({
        depends: [],
        supplies: "getModule",
        // get data() {
        //     return reservedData[this.supplies];
        // },
        // set data(v: any) {
        //     reservedData[this.supplies] = v;
        // },
        data: {},
        func(filter: (mod: any) => boolean) {
            if (this.data.req == undefined) {
                // @ts-expect-error Non-standard property
                window.webpackChunkdiscord_app.push(
                    [[Symbol()],
                    {},
                    (r: { c: any; }) =>
                        this.data = this.data ?? {
                            req: r,
                        },
                    ]);
                // @ts-expect-error Non-standard property
                window.webpackChunkdiscord_app.pop();
            }
            // @ts-expect-error too lazy
            return Object.values(this.data.req).find(filter)?.exports;
        },
    }),
    getByStrings: new FunctionImplementation({
        depends: ["getModule"],
        supplies: "getByStrings",
        data: null,
        func(...strings) {
            const getModule = require(targetMod, "Webpack", "getModule");
            if (!getModule)
                throw new Error("Unimplemented");
            return getModule((module: any) => {
                if (!module?.toString || typeof (module?.toString) !== "function") return; // Not stringable
                let moduleString = "";
                try { moduleString = module?.toString([]); }
                catch (err) { moduleString = module?.toString(); }
                if (!moduleString) return false; // Could not create string
                for (const s of strings) {
                    if (!moduleString.includes(s)) return false;
                }
                return true;
            });
        },
    }),
} as { [key: string]: FunctionImplementation };
export {
    implementationStore,
};
