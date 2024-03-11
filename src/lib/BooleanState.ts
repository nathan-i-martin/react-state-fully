import { GenericState, useGeneric } from "./GenericState.js";

export type BooleanState = GenericState<boolean> & {
    /** Toggles the current boolean state and updates the state to its opposite value. */
    toggle: ()                  => void,
    /** Sets the current state to true and updates the state. */
    true:   ()                  => void,
    /** Sets the current state to false and updates the state. */
    false:  ()                  => void,
}
export const useBoolean = (initial?: boolean) => {
    const state = useGeneric(initial ?? false);

    return {
        get:        state.get,
        set:        state.set,
        compute:    state.compute,
        equals:     state.equals,

        toggle: ()                  => state.set(!state.get()),
        true:   ()                  => state.set(true),
        false:  ()                  => state.set(false),
    } as BooleanState;
}
