import { GenericState, useGeneric } from "./GenericState.js";

export type SetState<V> = GenericState<Set<V>> & {
    /** Adds an item to the set and updates the state with the new set. */
    add:        (item: V)   => void,
    /** Removes an item from the set if it exists and updates the state. Returns true if the item was successfully removed, false otherwise. */
    remove:     (item: V)   => boolean,
    /** Deletes an item from the set if it exists and updates the state. Returns true if the item was successfully deleted, false otherwise. */
    delete:     (item: V)   => boolean,
    /** Checks if the set contains a specific item. Returns true if the item exists, false otherwise. */
    contains:   (item: V)   => boolean,
    /** Checks if the set has a specific item. Returns true if the item exists, false otherwise. */
    has:        (item: V)   => boolean,
    /** Returns the number of items in the set. */
    size:       ()          => number,
    /** Checks if the set is empty. Returns true if the set is empty, false otherwise. */
    isEmpty:    ()          => boolean,
    /** Clears all items from the set and updates the state. */
    clear:      ()          => void,

    /** Applies a function to each item in the set and returns an array of the results. */
    map:        (callback: (value: V, index: number, array: V[]) => any, thisArg?: any) => any[],
    /** Executes a provided function once for each set element. */
    forEach:    (callback: (value: V, value2: V, set: Set<V>) => void,   thisArg?: any) => void,

    /** Returns an iterator that contains an array of [value, value] for each element in the set. */
    entries:    ()  => IterableIterator<[V, V]>,
    /** Returns an iterator of the values in the set. */
    keys:       ()  => IterableIterator<V>,
    /** Returns an iterator of the values in the set. */
    values:     ()  => IterableIterator<V>,

    /** Converts the set to an array and returns it. */
    toArray:    () => V[],
}
export const useSet = <V> (initial?: Set<V>) => {
    const state = useGeneric(initial ?? new Set<V>());

    return {
        get:        state.get,
        set:        state.set,
        compute:    state.compute,
        equals:     state.equals,
        
        add:        (item: V)   => state.set(new Set([...state.get(), item])),
        remove:     (item: V)   => { const a = new Set(state.get()); const o = a.delete(item); state.set(a); return o; },
        delete:     (item: V)   => { const a = new Set(state.get()); const o = a.delete(item); state.set(a); return o; },
        contains:   (item: V)   => state.get().has(item),
        has:        (item: V)   => state.get().has(item),
        size:       ()          => state.get().size,
        clear:      ()          => state.set(new Set<V>()),
        isEmpty:    ()          => state.get().size == 0,

        map:        (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => Array.from(state.get()).map(callback, thisArg),
        forEach:    (callback: (value: V, value2: V,    set: Set<V>) => void, thisArg?: any) => state.get().forEach(callback, thisArg),

        entries:    ()  => state.get().entries(),
        keys:       ()  => state.get().keys(),
        values:     ()  => state.get().values(),
        
        toArray:    ()          => [...state.get()],
    } as SetState<V>;
}