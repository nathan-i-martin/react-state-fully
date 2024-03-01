import { useGeneric } from "./GenericState.js";

export type SetState<V> = {
    get:        ()              => Set<V>,
    set:        (set: Set<V>)   => void,
    add:        (item: V)       => void,
    remove:     (item: V)       => void,
    contains:   (item: V)       => boolean,
    size:       ()              => number,
    isEmpty:    ()              => boolean,
    clear:      ()              => void,

    map:        (callback: (value: V, index: number, array: V[]) => any, thisArg?: any) => any[],
    forEach:    (callback: (value: V, value2: V, set: Set<V>) => void,   thisArg?: any) => void,
}
export const useSet = <V> (initial?: Set<V>) => {
    const state = useGeneric(initial ?? new Set<V>());

    return {
        get:        ()              => state.get(),
        set:        (set: Set<V>)   => state.set(set),
        add:        (item: V)       => state.set(new Set([...state.get(), item])),
        remove:     (item: V)       => { const newHashSet = new Set(state.get()); newHashSet.delete(item); state.set(newHashSet); },
        contains:   (item: V)       => state.get().has(item),
        size:       ()              => state.get().size,
        clear:      ()              => state.set(new Set()),
        isEmpty:    ()              => state.get().size == 0,

        map:        (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => Array.from(state.get()).map(callback, thisArg),
        forEach:    (callback: (value: V, value2: V,    set: Set<V>) => void, thisArg?: any) => state.get().forEach(callback, thisArg),
    } as SetState<V>;
}