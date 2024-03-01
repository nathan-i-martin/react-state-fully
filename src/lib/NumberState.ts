import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type NumberState = StateHandler<number> & {
    add:        (value: number) => void,
    subtract:   (value: number) => void,
    multiply:   (value: number) => void,
    divide:     (value: number) => void,
    mod:        (value: number) => void,
    increment:  ()              => void,
    decrement:  ()              => void,
    equals:     (value: number) => boolean,
}
export const useNumber = (initial?: number) => {
    const state = useGeneric(initial ?? 0);

    return {
        get:        state.get(),
        set:        (value: number) => state.set(value),
        add:        (value: number) => state.set(state.get() + value),
        subtract:   (value: number) => state.set(state.get() - value),
        multiply:   (value: number) => state.set(state.get() * value),
        divide:     (value: number) => state.set(state.get() / value),
        mod:        (value: number) => state.set(state.get() % value),
        increment:  ()              => state.set(state.get() + 1),
        decrement:  ()              => state.set(state.get() - 1),
        equals:     (value: number) => state.equals(value),
    } as NumberState;
}