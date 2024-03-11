import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type NumberState = StateHandler<number> & {
    /** Adds the given value to the current state and updates the state with the new value. */
    add:        (value: number) => void,
    /** Subtracts the given value from the current state and updates the state with the new value. */
    subtract:   (value: number) => void,
    /** Multiplies the current state by the given value and updates the state with the new value. */
    multiply:   (value: number) => void,
    /** Divides the current state by the given value and updates the state with the new value. */
    divide:     (value: number) => void,
    /** Applies the modulus operation with the given value on the current state and updates the state with the new value. */
    mod:        (value: number) => void,
    /** Increments the current state by 1 and updates the state with the new value. */
    increment:  ()              => void,
    /** Decrements the current state by 1 and updates the state with the new value. */
    decrement:  ()              => void,
    /** Checks if the current state equals the given value. Returns true if equal, false otherwise. */
    equals:     (value: number) => boolean,
}
export const useNumber = (initial?: number) => {
    const state = useGeneric(initial ?? 0);

    return {
        get:        state.get,
        set:        state.set,
        compute:    state.compute,
        equals:     state.equals,

        add:        (value: number) => state.set(state.get() + value),
        subtract:   (value: number) => state.set(state.get() - value),
        multiply:   (value: number) => state.set(state.get() * value),
        divide:     (value: number) => state.set(state.get() / value),
        mod:        (value: number) => state.set(state.get() % value),
        increment:  ()              => state.set(state.get() + 1),
        decrement:  ()              => state.set(state.get() - 1),
    } as NumberState;
}