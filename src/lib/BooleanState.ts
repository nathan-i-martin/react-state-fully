import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type BooleanState = StateHandler<boolean> & {
    toggle: ()                  => void,
    equals: (value: boolean)    => boolean,
    true:   ()                  => void,
    false:  ()                  => void,
}
export const useBoolean = (initial?: boolean) => {
    const state = useGeneric(initial ?? false);

    return {
        get:    state.get(),
        set:    (value: boolean)    => state.set(value),
        toggle: ()                  => state.set(!state.get()),
        equals: (value: boolean)    => state.equals(value),
        true:   ()                  => state.set(true),
        false:  ()                  => state.set(false),
    } as BooleanState;
}
