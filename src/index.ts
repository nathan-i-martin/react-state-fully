import { useState } from "react";

type GenericState<T> = {
    get:    () => T,
    set:    (value: T) => void,
    equals: (value: T) => boolean,
}
const useGeneric = <T> (initial: T) => {
    const [state, setState] = useState(initial);

    return {
        get:    () => state,
        set:    (value: T) => setState(value),
        equals: (value: T) => value === state,
    } as GenericState<T>;
}

export type ArrayState<V> = {
    get:            ()                          => V,
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
const useArray = <V> (initial?: V[]) => {
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

export type SetState<V> = {
    get:        ()              => V,
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
const useSet = <V> (initial?: Set<V>) => {
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

export type MapState<V> = {
    get:        ()                      => V,
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
const useMap = <V> (initial?: Map<string, V>) => {
    const state = useGeneric(initial ?? new Map<string, V>());

    return {
        get:        ()                          => state.get(),
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

export type NumberState = {
    get:        ()              => number,
    set:        (value: number) => void,
    add:        (value: number) => void,
    subtract:   (value: number) => void,
    multiply:   (value: number) => void,
    divide:     (value: number) => void,
    mod:        (value: number) => void,
    increment:  ()              => void,
    decrement:  ()              => void,
    equals:     (value: number) => boolean,
}
const useNumber = (initial?: number) => {
    const state = useGeneric(initial ?? 0);

    return {
        get:        ()              => state.get(),
        set:        (value: number) => state.set(value),
        add:        (value: number) => state.set(state.get() + value),
        subtract:   (value: number) => state.set(state.get() - value),
        multiply:   (value: number) => state.set(state.get() * value),
        divide:     (value: number) => state.set(state.get() / value),
        mod:        (value: number) => state.set(state.get() % value),
        increment:  ()              => state.set(state.get() + 1),
        decrement:  ()              => state.set(state.get() - 1),
        equals:     (value: number) => state.equals(value),
    } as NumberState;
}

export type BooleanState = {
    get:    ()                  => boolean,
    set:    (value: boolean)    => void,
    toggle: ()                  => void,
    equals: (value: boolean)    => boolean,
    true:   ()                  => void,
    false:  ()                  => void,
}
const useBoolean = (initial?: boolean) => {
    const state = useGeneric(initial ?? false);

    return {
        get:    ()                  => state.get(),
        set:    (value: boolean)    => state.set(value),
        toggle: ()                  => state.set(!state),
        equals: (value: boolean)    => state.equals(value),
        true:   ()                  => state.set(true),
        false:  ()                  => state.set(false),
    } as BooleanState;
}

export type StringState = {
    get:        ()                  => string,
    set:        (value: string)     => void,
    concat:     (value: string)     => void,
    append:     (value: string)     => void,
    prepend:    (value: string)     => void,
    size:       ()                  => number,
    equals:     (value: string)     => boolean,
}
const useString = (initial?: string) => {
    const state = useGeneric(initial ?? "");

    return {
        get:        ()              => state.get(),
        set:        (value: string) => state.set(value),
        concat:     (value: string) => state.set(state.get() + value),
        append:     (value: string) => state.set(state.get() + value),
        prepend:    (value: string) => state.set(value + state.get()),
        size:       ()              => state.get().length,
        equals:     (value: string) => state.equals(value),
    } as StringState;
}

/*interface Optional<T> {
    get: () => T,
    getOrElse: (resolver?: ()=>T | T) => T,
    getOrThrow: () => T,
    exists: () => boolean
}*/

export const State = {
    useArray,
    useSet,
    useGeneric,
    useMap,
    useNumber,
    useString,
    useBoolean
};