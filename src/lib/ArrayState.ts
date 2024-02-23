import { useGeneric } from "./GenericState.js";

export type ArrayState<V> = {
    get:            ()                          => V[],
    set:            (array: V[])                => void,
    getValue:       (index: number)             => V | undefined,
    getFirstValue:  ()                          => V | undefined,
    getLastValue:   ()                          => V | undefined,
    push:           (item: V)                   => void,
    pop:            ()                          => void,
    add:            (item: V)                   => void,
    put:            (index: number, value: V)   => void,
    remove:         (index: number)             => void,
    contains:       (item: V)                   => boolean,
    size:           ()                          => number,
    isEmpty:        ()                          => boolean,
    clear:          ()                          => void,

    map:            (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => any[],
    forEach:        (callback: (value: V, index: number, array: V[]) => void, thisArg?: any) => void,
}
export const useArray = <V> (initial?: V[]) => {
    const state = useGeneric(initial ?? []);

    return {
        get:            ()                          => state.get(),
        set:            (array: V[])                => state.set(array),
        getValue:       (index: number)             => state.get()[index],
        getFirstValue:  ()                          => state.get()[0],
        getLastValue:   ()                          => state.get()[state.get().length - 1],
        push:           (item: V)                   => state.set([...state.get(), item]),
        pop:            ()                          => state.set(state.get().slice(0, -1)),
        add:            (item: V)                   => state.set([...state.get(), item]),
        put:            (index: number, value: V)   => { const newArray = [...state.get()]; newArray[index] = value; state.set(newArray); },
        remove:         (index: number)             => { const newArray = [...state.get()]; newArray.splice(index, 1); state.set(newArray); },
        contains:       (item: V)                   => state.get().includes(item),
        size:           ()                          => state.get().length,
        clear:          ()                          => state.set([]),
        isEmpty:        ()                          => state.get().length == 0,

        map:            (callback: (value: V, index: number, array: V[]) => any,  thisArg?: any) => state.get().map(callback, thisArg),
        forEach:        (callback: (value: V, index: number, array: V[]) => void, thisArg?: any) => state.get().forEach(callback, thisArg),
    } as ArrayState<V>;
}