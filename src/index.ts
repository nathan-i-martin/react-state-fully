import { useState } from "react";

const useGeneric = <T extends any> (initial: T) => {
    const [state, setState] = useState(initial);

    return {
        get: () => state,
        set: (value: T) => setState(value),
    };
}

const useArray = <V> (initial?: V[]) => {
    const state = useGeneric(initial ?? []);

    return {
        push:       (item: V)       => state.set([...state.get(), item]),
        pop:        ()              => state.set(state.get().slice(0, -1)),
        add:        (item: V)       => state.set([...state.get(), item]),
        remove:     (index: number) => state.set(state.get().filter((_, i) => i !== index)),
        contains:   (item: V)       => state.get().includes(item),
        size:       ()              => state.get().length,

        map:        (callback: (item: V, index: number) => any) => state.get().map(callback),
    };
}

const useSet = <V> (initial?: Set<V>) => {
    const state = useGeneric(initial ?? new Set<V>());

    return {
        add:        (item: V)       => state.set(new Set([...state.get(), item])),
        remove:     (item: V)       => { const newHashSet = new Set(state.get()); newHashSet.delete(item); state.set(newHashSet); },
        contains:   (item: V)       => state.get().has(item),
        size:       ()              => state.get().size,

        map:        (callback: (item: V, index: number) => any) => Array.from(state.get()).map(callback),
    };
}

const useMap = <K, V> (initial?: Map<K, V>) => {
    const state = useGeneric(initial ?? new Map<K, V>());

    return {
        put:        (key: K, value: V)  => state.set(new Map(state.get()).set(key, value)),
        remove:     (key: K)            => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        contains:   (key: K)            => state.get().has(key),
        size:       ()                  => state.get().size,
    };
}

const useNumber = (initial?: number) => {
    const state = useGeneric(initial ?? 0);

    return {
        get:        () =>              state.get(),
        set:        (value: number) => state.set(value),
        add:        (value: number) => state.set(state.get() + value),
        subtract:   (value: number) => state.set(state.get() - value),
        multiply:   (value: number) => state.set(state.get() * value),
        divide:     (value: number) => state.set(state.get() / value),
        mod:        (value: number) => state.set(state.get() % value),
        increment:  () =>              state.set(state.get() + 1),
        decrement:  () =>              state.set(state.get() - 1),
    };
}

const useString = (initial?: string) => {
    const state = useGeneric(initial ?? "");

    return {
        get:        () =>              state.get(),
        set:        (value: string) => state.set(value),
        concat:     (value: string) => state.set(state.get() + value),
        append:     (value: string) => state.set(state.get() + value),
        prepend:    (value: string) => state.set(value + state.get()),
    };
}

const State = {
    useArray,
    useSet,
    useGeneric,
    useMap,
    useNumber,
    useString
};

export { State };