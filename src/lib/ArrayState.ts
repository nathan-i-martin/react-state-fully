import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type ArrayState<V> = StateHandler<V[]> & {
    getValue:       (index: number)             => V | undefined,
    getFirstValue:  ()                          => V | undefined,
    getLastValue:   ()                          => V | undefined,
    add:            (item: V)                   => void,
    put:            (index: number, value: V)   => void,
    remove:         (index: number)             => void,
    contains:       (item: V)                   => boolean,
    size:           ()                          => number,
    isEmpty:        ()                          => boolean,
    clear:          ()                          => void,

    map:            (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => any[],
    forEach:        (callback: (value: V, index: number, array: V[]) => void, thisArg?: any) => void,
    filter:         (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => V[],
    mutateFilter:   (predicate: (value: V, index: number, array: V[]) => value is V, thisArg?: any)             => V[],
    reduce:         (callbackfn: (previousValue: V, currentValue: V, currentIndex: number, array: V[]) => V)    => V,
    find:           (predicate: (value: V, index: number, obj: V[]) => value is V, thisArg?: any)               => V | undefined,
    some:           (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => boolean,
    every:          (predicate: (value: V, index: number, array: V[]) => unknown, thisArg?: any)                => boolean,
    
    at:             (index: number)                                 => V | undefined,
    join:           (separator?: string)                            => string,
    concat:         (...arrays: V[])                                => V[],
    indexOf:        (searchElement: V, fromIndex?: number)          => number,
    lastIndexOf:    (searchElement: V, fromIndex?: number)          => number,
    includes:       (searchElement: V, fromIndex?: number)          => boolean,
    slice:          (start?: number, end?: number)                   => V[],

    pop:        ()                                              => V | undefined,
    push:       (...items: V[])                                 => number,
    copyWithin: (target: number, start: number, end?: number)   => V[],
    fill:       (value: V, start?: number , end?: number)       => V[],
    reverse:    ()                                              => V[],
    shift:      ()                                              => V | undefined,
    unshift:    (...items: V[])                                 => number,
    splice:     (start: number, deleteCount?: number)           => V[],
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
        
        at:             (index: number)                                 => state.get().at(index),
        join:           (separator?: string)                            => state.get().join(separator),
        concat:         (...arrays: V[])                                => state.get().concat(...arrays),
        indexOf:        (searchElement: V, fromIndex?: number)          => state.get().indexOf(searchElement, fromIndex),
        lastIndexOf:    (searchElement: V, fromIndex?: number)          => state.get().lastIndexOf(searchElement, fromIndex),
        includes:       (searchElement: V, fromIndex?: number)          => state.get().includes(searchElement, fromIndex),
        slice:          (start?: number, end?: number)                  => state.get().slice(start, end),

        pop:        ()                                              => { const a = [...state.get()]; const o = a.pop();                             state.set(a); return o; },
        push:       (...items: V[])                                 => { const a = [...state.get()]; const o = a.push(...items);                    state.set(a); return o; },
        copyWithin: (target: number, start: number, end?: number)   => { const a = [...state.get()]; const o = a.copyWithin(target, start, end);    state.set(a); return o; },
        fill:       (value: V, start?: number , end?: number)       => { const a = [...state.get()]; const o = a.fill(value, start, end);           state.set(a); return o; },
        reverse:    ()                                              => { const a = [...state.get()]; const o = a.reverse();                         state.set(a); return o; },
        shift:      ()                                              => { const a = [...state.get()]; const o = a.shift();                           state.set(a); return o; },
        unshift:    (...items: V[])                                 => { const a = [...state.get()]; const o = a.unshift(...items);                 state.set(a); return o; },
        splice:     (start: number, deleteCount?: number)           => { const a = [...state.get()]; const o = a.splice(start, deleteCount);        state.set(a); return o; },
    } as ArrayState<V>;
}