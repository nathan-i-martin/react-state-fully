import { StateHandler, useStateHandler } from "./StateHandler.js";

export type GenericState<T> = StateHandler<T> & {
    /**
     * Computes a new state value given the current state value.
     * @param value The current state.
     * @returns The new state to be stored.
     */
    compute: (callback: (value: T) => T)=>void;

    /**
     * Performs an absolute equality between the passed value and the current state (===).
     * @param value The value to check for.
     * @returns `true` if the two values match absolutely (===). `false` otherwise.
     */
    equals: (value: T) => boolean,
}
export const useGeneric = <T> (initial: T) => {
    const state = useStateHandler(initial);

    return {
        get: state.get,
        set: state.set,
        compute: (callback: (value: T) => T) => state.set(callback(state.get())),
        equals: (value: T) => value === state.get(),
    } as GenericState<T>;
}