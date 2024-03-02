import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type ArrayState<V> = StateHandler<V[]> & {
    /** Retrieves the value at the specified index in the array. Returns undefined if the index is out of bounds. */
    getValue:       (index: number)             => V | undefined,
    /** Retrieves the first value in the array. Returns undefined if the array is empty. */
    getFirstValue:  ()                          => V | undefined,
    /** Retrieves the last value in the array. Returns undefined if the array is empty. */
    getLastValue:   ()                          => V | undefined,
    /** Adds an item to the end of the array and updates the state. */
    add:            (item: V)                   => void,
    /** Replaces the value at the specified index with a new value and updates the state. */
    put:            (index: number, value: V)   => void,
    /** Removes the item at the specified index from the array and updates the state. */
    remove:         (index: number)             => void,
    /** Checks if the array contains a specific item. Returns true if the item exists, false otherwise. */
    contains:       (item: V)                   => boolean,
    /** Returns the number of items in the array. */
    size:           ()                          => number,
    /** Checks if the array is empty. Returns true if the array is empty, false otherwise. */
    isEmpty:        ()                          => boolean,
    /** Clears all items from the array and updates the state. */
    clear:          ()                          => void,

    /** Creates a new array with the results of calling a provided function on every element in the calling array. */
    map:            (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => any[],
    /** Executes a provided function once for each array element. */
    forEach:        (callback: (value: V, index: number, array: V[]) => void, thisArg?: any) => void,
    /** Creates a new array with all elements that pass the test implemented by the provided function. */
    filter:         (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => V[],
    /** Filters the array by a predicate, modifies the original state with the filtered array, and returns the new array. */
    mutateFilter:   (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => V[],
    /** Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value. */
    reduce:         (callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V)    => V,
    /** Returns the value of the first element in the array that satisfies the provided testing function. Otherwise undefined is returned. */
    find:           (predicate: (value: V, index: number, obj: V[]) => value is V, thisArg?: any)               => V | undefined,
    /** Tests whether at least one element in the array passes the test implemented by the provided function. */
    some:           (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => boolean,
    /** Tests whether all elements in the array pass the test implemented by the provided function. */
    every:          (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => boolean,
    
    /** Retrieves the value at the specified index in the array using the at() method. Returns undefined if the index is out of bounds. */
    at:             (index: number)                         => V | undefined,
    /** Joins all elements of an array into a string and returns this string. */
    join:           (separator?: string)                    => string,
    /** Concatenates the array with other array(s) and/or value(s), and returns a new array. */
    concat:         (...arrays: V[])                        => V[],
    /** Returns the first index at which a given element can be found in the array, or -1 if it is not present. */
    indexOf:        (searchElement: V, fromIndex?: number)  => number,
    /** Returns the last index at which a given element can be found in the array, or -1 if it is not present. */
    lastIndexOf:    (searchElement: V, fromIndex?: number)  => number,
    /** Determines whether an array includes a certain value among its entries, returning true or false as appropriate. */
    includes:       (searchElement: V, fromIndex?: number)  => boolean,
    /** Returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). */
    slice:          (start?: number, end?: number)          => V[],

    /** Removes the last element from an array and returns that element. This method changes the length of the array and updates the state. */
    pop:        ()                                              => V | undefined,
    /** Adds one or more elements to the end of an array and returns the new length of the array. This method changes the length of the array and updates the state. */
    push:       (...items: V[])                                 => number,
    /** Copies part of an array to another location in the same array and returns it without modifying its length. */
    copyWithin: (target: number, start: number, end?: number)   => V[],
    /** Fills all the elements of an array from a start index to an end index with a static value and updates the state. */
    fill:       (value: V, start?: number , end?: number)       => V[],
    /** Reverses an array in place. The first array element becomes the last, and the last array element becomes the first. This method updates the state. */
    reverse:    ()                                              => V[],
    /** Removes the first element from an array and returns that removed element. This method changes the length of the array and updates the state. */
    shift:      ()                                              => V | undefined,
    /** Adds one or more elements to the beginning of an array and returns the new length of the array. This method changes the length of the array and updates the state. */
    unshift:    (...items: V[])                                 => number,
    /** Changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. This method updates the state. */
    splice:     (start: number, deleteCount?: number)           => V[],

    /** Removes duplicate values from the array and updates the state. */
    removeDuplicates:   () => void,
}
export const useArray = <V> (initial?: V[]) => {
    const state = useGeneric(initial ?? []);

    return {
        get:            state.get,
        set:            state.set,
        getValue:       (index: number)             => state.get()[index],
        getFirstValue:  ()                          => state.get()[0],
        getLastValue:   ()                          => state.get()[state.get().length - 1],
        add:            (item: V)                   => state.set([...state.get(), item]),
        put:            (index: number, value: V)   => { const newArray = [...state.get()]; newArray[index] = value; state.set(newArray); },
        remove:         (index: number)             => { const newArray = [...state.get()]; newArray.splice(index, 1); state.set(newArray); },
        contains:       (item: V)                   => state.get().includes(item),
        size:           ()                          => state.get().length,
        clear:          ()                          => state.set([]),
        isEmpty:        ()                          => state.get().length == 0,

        map:            (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any)                    => state.get().map(callback, thisArg),
        forEach:        (callback: (value: V, index: number, array: V[]) => void, thisArg?: any)                    => state.get().forEach(callback, thisArg),
        filter:         (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => state.get().filter(predicate, thisArg),
        mutateFilter:   (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => { const o = state.get().filter(predicate, thisArg); state.set(o); return o; },
        reduce:         (callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V)    => state.get().reduce(callbackfn),
        find:           (predicate: (value: V, index: number, obj: V[]) => value is V, thisArg?: any)               => state.get().find(predicate, thisArg),
        some:           (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => state.get().some(predicate, thisArg),
        every:          (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => state.get().every(predicate, thisArg),

        at:             (index: number)                         => state.get().at(index),
        join:           (separator?: string)                    => state.get().join(separator),
        concat:         (...arrays: V[])                        => state.get().concat(...arrays),
        indexOf:        (searchElement: V, fromIndex?: number)  => state.get().indexOf(searchElement, fromIndex),
        lastIndexOf:    (searchElement: V, fromIndex?: number)  => state.get().lastIndexOf(searchElement, fromIndex),
        includes:       (searchElement: V, fromIndex?: number)  => state.get().includes(searchElement, fromIndex),
        slice:          (start?: number, end?: number)          => state.get().slice(start, end),

        pop:        ()                                              => { const a = [...state.get()]; const o = a.pop();                             state.set(a); return o; },
        push:       (...items: V[])                                 => { const a = [...state.get()]; const o = a.push(...items);                    state.set(a); return o; },
        copyWithin: (target: number, start: number, end?: number)   => { const a = [...state.get()]; const o = a.copyWithin(target, start, end);    state.set(a); return o; },
        fill:       (value: V, start?: number , end?: number)       => { const a = [...state.get()]; const o = a.fill(value, start, end);           state.set(a); return o; },
        reverse:    ()                                              => { const a = [...state.get()]; const o = a.reverse();                         state.set(a); return o; },
        shift:      ()                                              => { const a = [...state.get()]; const o = a.shift();                           state.set(a); return o; },
        unshift:    (...items: V[])                                 => { const a = [...state.get()]; const o = a.unshift(...items);                 state.set(a); return o; },
        splice:     (start: number, deleteCount?: number)           => { const a = [...state.get()]; const o = a.splice(start, deleteCount);        state.set(a); return o; },
        
        removeDuplicates:   () => state.set([...new Set(state.get())]),
    } as ArrayState<V>;
}