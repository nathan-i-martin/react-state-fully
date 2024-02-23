type GenericState<T> = {
    get: () => T;
    set: (value: T) => void;
    equals: (value: T) => boolean;
};
export type ArrayState<V> = {
    get: () => V;
    set: (array: V[]) => void;
    getValue: (index: number) => V | undefined;
    getFirstValue: () => V | undefined;
    getLastValue: () => V | undefined;
    push: (item: V) => void;
    pop: () => void;
    add: (item: V) => void;
    put: (index: number, value: V) => void;
    remove: (index: number) => void;
    contains: (item: V) => boolean;
    size: () => number;
    map: (callback: (item: V, index: number) => any) => any[];
};
export type SetState<V> = {
    get: () => V;
    set: (set: Set<V>) => void;
    add: (item: V) => void;
    remove: (item: V) => void;
    contains: (item: V) => boolean;
    size: () => number;
    map: (callback: (item: V, index: number) => any) => any[];
};
export type MapState<K, V> = {
    get: () => V;
    set: (map: Map<K, V>) => void;
    put: (key: K, value: V) => void;
    remove: (key: K) => void;
    contains: (key: K) => boolean;
    size: () => number;
};
export type NumberState = {
    get: () => number;
    set: (value: number) => void;
    add: (value: number) => void;
    subtract: (value: number) => void;
    multiply: (value: number) => void;
    divide: (value: number) => void;
    mod: (value: number) => void;
    increment: () => void;
    decrement: () => void;
    equals: (value: number) => boolean;
};
export type BooleanState = {
    get: () => boolean;
    set: (value: boolean) => void;
    toggle: () => void;
    equals: (value: boolean) => boolean;
    true: () => void;
    false: () => void;
};
export type StringState = {
    get: () => string;
    set: (value: string) => void;
    concat: (value: string) => void;
    append: (value: string) => void;
    prepend: (value: string) => void;
    size: () => number;
    equals: (value: string) => boolean;
};
export declare const State: {
    useArray: <V>(initial?: V[] | undefined) => ArrayState<V>;
    useSet: <V_1>(initial?: Set<V_1> | undefined) => SetState<V_1>;
    useGeneric: <T>(initial: T) => GenericState<T>;
    useMap: <K, V_2>(initial?: Map<K, V_2> | undefined) => MapState<K, V_2>;
    useNumber: (initial?: number) => NumberState;
    useString: (initial?: string) => StringState;
    useBoolean: (initial?: boolean) => BooleanState;
};
export {};
