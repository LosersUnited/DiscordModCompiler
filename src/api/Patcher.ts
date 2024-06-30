export interface IBasePatcherApi {
    unpatchAll(): void;
    after<T, A = unknown[], R = unknown>(target: T, name: string, cb: (args: A, res: R, instance: T) => R): () => void;
}
