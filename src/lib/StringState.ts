import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type StringState = StateHandler<string> & {
    concat:     (value: string)     => void,
    append:     (value: string)     => void,
    prepend:    (value: string)     => void,
    size:       ()                  => number,
    equals:     (value: string)     => boolean,
}
export const useString = (initial?: string) => {
    const state = useGeneric(initial ?? "");

    return {
        get:        state.get(),
        set:        (value: string) => state.set(value),
        concat:     (value: string) => state.set(state.get() + value),
        append:     (value: string) => state.set(state.get() + value),
        prepend:    (value: string) => state.set(value + state.get()),
        size:       ()              => state.get().length,
        equals:     (value: string) => state.equals(value),
    } as StringState;
}