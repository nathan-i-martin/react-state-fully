import { useStateHandler } from "./StateHandler.js";

export type GenericState<T> = {
    get:    () => T,
    set:    (value: T) => void,
    equals: (value: T) => boolean,
}
export const useGeneric = <T> (initial: T) => {
    const state = useStateHandler(initial);

    return {
        get: state.get,
        set: state.set,
        equals: (value: T) => value === state.get(),
    } as GenericState<T>;
}