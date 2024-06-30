export interface IBasePatcherApi {
    internalId: string | undefined; /* NOT ON REPLUGGED */
    unpatchAll(): void;
    after<T, A = unknown[], R = unknown>(target: T, name: string, cb: (args: A, res: R, instance: T) => R): () => void;
}

class DummyPatcherApi implements IBasePatcherApi {
    internalId: string | undefined;
    unpatchAll(): void {
        throw new Error("Method not implemented. This is a dummy class.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    after<T, A = unknown[], R = unknown>(target: T, name: string, cb: (args: A, res: R, instance: T) => R): () => void {
        throw new Error("Method not implemented. This is a dummy class.");
    }
}

export const PatcherApi = DummyPatcherApi;
