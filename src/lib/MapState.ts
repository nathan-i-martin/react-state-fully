import { useGeneric } from "./GenericState.js";

export type MapState<V> = {
    get:        ()                      => Map<string,V>,
    getValue:   (key: string)           => V | undefined,
    set:        (map: Map<string,V>)    => void,
    put:        (key: string, value: V) => void,
    remove:     (key: string)           => void,
    contains:   (key: string)           => boolean,
    size:       ()                      => number,
    isEmpty:    ()                      => boolean,
    clear:      ()                      => void,

    map:        (callback: (value: [string, any], index: number, array: [string, any][]) => any,  thisArg?: any) => any[],
    forEach:    (callback: (value: [string, any], index: number, array: [string, any][]) => void, thisArg?: any) => void
}
export const useMap = <V> (initial?: Map<string, V>) => {
    const state = useGeneric(initial ?? new Map<string, V>());

    return {
        get:        ()                          => state.get(),
        getValue:   (key: string)               => state.get().get(key),
        set:        (map: Map<string,V>)        => state.set(map),
        put:        (key: string, value: V)     => state.set(new Map(state.get()).set(key, value)),
        remove:     (key: string)               => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        contains:   (key: string)               => state.get().has(key),
        size:       ()                          => state.get().size,
        clear:      ()                          => state.set(new Map()),
        isEmpty:    ()                          => state.get().size == 0,

        map:        (callback: (value: [string, any], index: number, array: [string, any][]) => any,  thisArg?: any) => Object.entries(state.get()).map(callback, thisArg),
        forEach:    (callback: (value: [string, any], index: number, array: [string, any][]) => void, thisArg?: any) => Object.entries(state.get()).forEach(callback, thisArg),
    } as MapState<V>;
}