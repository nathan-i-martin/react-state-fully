import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type MapState<K, V> = StateHandler<Map<K, V>> & {
    /** Retrieves the value associated with the specified key in the map. Returns undefined if the key does not exist. */
    getValue:   (key: K)           => V | undefined,
    /** Inserts or updates a key-value pair in the map and updates the state. */
    put:        (key: K, value: V) => void,
    /** Removes the specified key and its associated value from the map, if it exists, and updates the state. */
    remove:     (key: K)           => void,
    /** Checks if the map contains the specified key. Returns true if the key exists, false otherwise. */
    contains:   (key: K)           => boolean,
    /** Returns the number of key-value pairs in the map. */
    size:       ()                 => number,
    /** Checks if the map is empty (contains no key-value pairs). Returns true if empty, false otherwise. */
    isEmpty:    ()                 => boolean,
    /** Removes all key-value pairs from the map and updates the state. */
    clear:      ()                 => void,

    /** Creates an array of values by running each element in the map through a callback function. */
    map:        (callback: (value: [K, V], index: number, array: [K, V][]) => any,  thisArg?: any) => any[],
    /** Executes a provided function once for each map entry. */
    forEach:    (callback: (value: [K, V], index: number, array: [K, V][]) => void, thisArg?: any) => void,

    /** Returns an iterable of key-value pairs for every entry in the map. */
    entries:    ()  => IterableIterator<[K, V]>,
    /** Returns an iterable of keys in the map. */
    keys:       ()  => IterableIterator<K>,
    /** Returns an iterable of values in the map. */
    values:     ()  => IterableIterator<V>,
}
export const useMap = <K, V> (initial?: Map<K, V>) => {
    const state = useGeneric(initial ?? new Map<K, V>());

    return {
        get:        state.get,
        set:        state.set,
        compute:    state.compute,
        equals:     state.equals,

        getValue:   (key: K)           => state.get().get(key),
        put:        (key: K, value: V) => state.set(new Map(state.get()).set(key, value)),
        remove:     (key: K)           => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        delete:     (key: K)           => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        contains:   (key: K)           => state.get().has(key),
        has:        (key: K)           => state.get().has(key),
        size:       ()                      => state.get().size,
        clear:      ()                      => state.set(new Map()),
        isEmpty:    ()                      => state.get().size == 0,

        map: (callback: (value: [K, V], index: number, array: [K, V][]) => any, thisArg?: any) => {
            const map = state.get();
            const result: any[] = [];
            let index = 0;
            for (const entry of map.entries()) {
                const cbResult = callback.call(thisArg, entry, index, Array.from(map.entries()));
                result.push(cbResult);
                index++;
            }
            return result;
        },
        forEach: (callback: (value: [K, V], index: number, array: [K, V][]) => void, thisArg?: any) => {
            const map = state.get();
            let index = 0;
            for (const entry of map.entries()) {
                callback.call(thisArg, entry, index, Array.from(map.entries()));
                index++;
            }
        },

        entries:    ()  => state.get().entries(),
        keys:       ()  => state.get().keys(),
        values:     ()  => state.get().values(),
    } as MapState<K, V>;
}