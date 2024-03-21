import { ArrayState } from "./lib/ArrayState.js";
import { BooleanState } from "./lib/BooleanState.js";
import { GenericState } from "./lib/GenericState.js";
import { MapState } from "./lib/MapState.js";
import { NumberState } from "./lib/NumberState.js";
import { Optional, OptionalState } from "./lib/OptionalState.js";
import { SetState } from "./lib/SetState.js";
import { StringState } from "./lib/StringState.js";
export declare const State: {
    useGeneric: <T>(initial: T) => GenericState<T>;
    useOptional: <T_1>(initial?: T_1 | Optional<T_1> | undefined) => OptionalState<T_1>;
    useArray: <V>(initial?: V[] | undefined) => ArrayState<V>;
    useSet: <V_1>(initial?: Set<V_1> | undefined) => SetState<V_1>;
    useMap: <K, V_2>(initial?: Map<K, V_2> | undefined) => MapState<K, V_2>;
    useNumber: (initial?: number | undefined) => NumberState;
    useString: (initial?: string | undefined) => StringState;
    useBoolean: (initial?: boolean | undefined) => BooleanState;
};
export { BooleanState, GenericState, NumberState, StringState, ArrayState, SetState, MapState, Optional, OptionalState };
