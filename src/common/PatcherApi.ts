import { FunctionImplementation, __requireInternal } from "./index.js";
import { IModImplementation } from "../api/ModImplementation.js";
import { IBasePatcherApi } from "../api/Patcher.js";
export let targetMod: IModImplementation;

const implementationStore = {
    Patcher_constructor: new FunctionImplementation({
        data: null,
        depends: [],
        supplies: "constructor_",
        isWrapper: true,
        asImmediatelyInvokedFunctionExpression: true,
        func() {
            return {
                internalId: Date.now().toString(),
                get after() {
                    return __requireInternal(targetMod, "PatcherApi", "after")?.bind(undefined, this);
                },
                get unpatchAll() {
                    return __requireInternal(targetMod, "PatcherApi", "unpatchAll")?.bind(undefined, this);
                },
                get before() {
                    return __requireInternal(targetMod, "PatcherApi", "after")?.bind(undefined, this);
                },
            };
        },
    }),
    afterWrapper: new FunctionImplementation({
        data: null,
        depends: [],
        supplies: "after",
        isWrapper: true,
        func<T, A = unknown[], R = unknown>(thisObj: IBasePatcherApi, target: T, name: string, cb: (args: A, res: R, instance: T) => R): () => void {
            return __requireInternal(targetMod, "PatcherApi", "after", true)!(thisObj.internalId, target, name, (instance_: T, args_: A, res_: R) => {
                return cb(args_, res_, instance_);
            });
        },
    }),
    unpatchAllWrapper: new FunctionImplementation({
        data: null,
        depends: [],
        supplies: "unpatchAll",
        isWrapper: true,
        func(thisObj: IBasePatcherApi) {
            return __requireInternal(targetMod, "PatcherApi", "unpatchAll", true)!(thisObj.internalId);
        },
    }),
    beforeWrapper: new FunctionImplementation({
        data: null,
        depends: [],
        supplies: "before",
        isWrapper: true,
        func<T, A = unknown[]>(thisObj: IBasePatcherApi, target: T, name: string, cb: (args: A, instance: T) => A): () => void { // in replugged callback needs to return arguments. what happens in BD?
            return __requireInternal(targetMod, "PatcherApi", "before", true)!(thisObj.internalId, target, name, (instance_: T, args_: A) => {
                return cb(args_, instance_);
            });
        },
    }),
} as { [key: string]: FunctionImplementation };
export {
    implementationStore,
};
