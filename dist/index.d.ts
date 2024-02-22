declare const State: {
    useArray: <V>(initial?: V[] | undefined) => {
        get: () => V[];
        set: (array: V[]) => void;
        getValue: (index: number) => V;
        getFirstValue: () => V;
        getLastValue: () => V;
        push: (item: V) => void;
        pop: () => void;
        add: (item: V) => void;
        put: (index: number, value: V) => void;
        remove: (index: number) => void;
        contains: (item: V) => boolean;
        size: () => number;
        map: (callback: (item: V, index: number) => any) => any[];
    };
    useSet: <V_1>(initial?: Set<V_1> | undefined) => {
        get: () => Set<V_1>;
        set: (set: Set<V_1>) => void;
        add: (item: V_1) => void;
        remove: (item: V_1) => void;
        contains: (item: V_1) => boolean;
        size: () => number;
        map: (callback: (item: V_1, index: number) => any) => any[];
    };
    useGeneric: <T extends unknown>(initial: T) => {
        get: () => T;
        set: (value: T) => void;
    };
    useMap: <K, V_2>(initial?: Map<K, V_2> | undefined) => {
        get: () => Map<K, V_2>;
        set: (map: Map<K, V_2>) => void;
        put: (key: K, value: V_2) => void;
        remove: (key: K) => void;
        contains: (key: K) => boolean;
        size: () => number;
    };
    useNumber: (initial?: number) => {
        get: () => number;
        set: (value: number) => void;
        add: (value: number) => void;
        subtract: (value: number) => void;
        multiply: (value: number) => void;
        divide: (value: number) => void;
        mod: (value: number) => void;
        increment: () => void;
        decrement: () => void;
    };
    useString: (initial?: string) => {
        get: () => string;
        set: (value: string) => void;
        concat: (value: string) => void;
        append: (value: string) => void;
        prepend: (value: string) => void;
        size: () => number;
    };
    useBoolean: (initial?: boolean) => {
        get: () => boolean;
        set: (value: boolean) => void;
        toggle: () => void;
    };
};
export { State };
