import { useState } from 'react';

class Optional {
    value;
    constructor(value) {
        this.value = value;
    }
    orElseGet = (resolver) => {
        if (this.exists())
            return this.value;
        return resolver();
    };
    orElseNull = () => {
        if (this.exists())
            return this.value;
        return null;
    };
    orElseUndefined = () => {
        if (this.exists())
            return this.value;
        return undefined;
    };
    orElseThrow = (resolver) => {
        if (this.exists())
            return this.value;
        if (resolver)
            throw resolver();
        throw new Error();
    };
    exists = () => {
        return this.value != undefined;
    };
    equals = (other) => {
        return other.orElseUndefined() === this.orElseUndefined();
    };
    static empty = () => {
        return new Optional();
    };
    static from = (value) => {
        return new Optional(value);
    };
}
const useGeneric = (initial) => {
    const [state, setState] = useState(initial);
    return {
        get: () => state,
        set: (value) => setState(value),
        equals: (value) => value === state,
    };
};
const useOptionalGeneric = (initial) => {
    const [state, setState] = useState(initial instanceof Optional ? initial : new Optional(initial));
    return {
        get: () => state,
        orElseGet: (resolver) => state.orElseGet(resolver),
        orElseNull: () => state.orElseNull(),
        orElseUndefined: () => state.orElseUndefined(),
        orElseThrow: (resolver) => state.orElseThrow(resolver),
        exists: () => state.exists(),
        set: (value) => setState(value instanceof Optional ? value : new Optional(value)),
        equals: (value) => state.equals(value),
    };
};
const useArray = (initial) => {
    const state = useGeneric(initial ?? []);
    return {
        get: () => state.get(),
        set: (array) => state.set(array),
        getValue: (index) => state.get()[index],
        getFirstValue: () => state.get()[0],
        getLastValue: () => state.get()[state.get().length - 1],
        push: (item) => state.set([...state.get(), item]),
        pop: () => state.set(state.get().slice(0, -1)),
        add: (item) => state.set([...state.get(), item]),
        put: (index, value) => { const newArray = [...state.get()]; newArray[index] = value; state.set(newArray); },
        remove: (index) => { const newArray = [...state.get()]; newArray.splice(index, 1); state.set(newArray); },
        contains: (item) => state.get().includes(item),
        size: () => state.get().length,
        clear: () => state.set([]),
        isEmpty: () => state.get().length == 0,
        map: (callback, thisArg) => state.get().map(callback, thisArg),
        forEach: (callback, thisArg) => state.get().forEach(callback, thisArg),
    };
};
const useSet = (initial) => {
    const state = useGeneric(initial ?? new Set());
    return {
        get: () => state.get(),
        set: (set) => state.set(set),
        add: (item) => state.set(new Set([...state.get(), item])),
        remove: (item) => { const newHashSet = new Set(state.get()); newHashSet.delete(item); state.set(newHashSet); },
        contains: (item) => state.get().has(item),
        size: () => state.get().size,
        clear: () => state.set(new Set()),
        isEmpty: () => state.get().size == 0,
        map: (callback, thisArg) => Array.from(state.get()).map(callback, thisArg),
        forEach: (callback, thisArg) => state.get().forEach(callback, thisArg),
    };
};
const useMap = (initial) => {
    const state = useGeneric(initial ?? new Map());
    return {
        get: () => state.get(),
        getValue: (key) => state.get().get(key),
        set: (map) => state.set(map),
        put: (key, value) => state.set(new Map(state.get()).set(key, value)),
        remove: (key) => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        contains: (key) => state.get().has(key),
        size: () => state.get().size,
        clear: () => state.set(new Map()),
        isEmpty: () => state.get().size == 0,
        map: (callback, thisArg) => Object.entries(state.get()).map(callback, thisArg),
        forEach: (callback, thisArg) => Object.entries(state.get()).forEach(callback, thisArg),
    };
};
const useNumber = (initial) => {
    const state = useGeneric(initial ?? 0);
    return {
        get: () => state.get(),
        set: (value) => state.set(value),
        add: (value) => state.set(state.get() + value),
        subtract: (value) => state.set(state.get() - value),
        multiply: (value) => state.set(state.get() * value),
        divide: (value) => state.set(state.get() / value),
        mod: (value) => state.set(state.get() % value),
        increment: () => state.set(state.get() + 1),
        decrement: () => state.set(state.get() - 1),
        equals: (value) => state.equals(value),
    };
};
const useBoolean = (initial) => {
    const state = useGeneric(initial ?? false);
    return {
        get: () => state.get(),
        set: (value) => state.set(value),
        toggle: () => state.set(!state),
        equals: (value) => state.equals(value),
        true: () => state.set(true),
        false: () => state.set(false),
    };
};
const useString = (initial) => {
    const state = useGeneric(initial ?? "");
    return {
        get: () => state.get(),
        set: (value) => state.set(value),
        concat: (value) => state.set(state.get() + value),
        append: (value) => state.set(state.get() + value),
        prepend: (value) => state.set(value + state.get()),
        size: () => state.get().length,
        equals: (value) => state.equals(value),
    };
};
/*interface Optional<T> {
    get: () => T,
    getOrElse: (resolver?: ()=>T | T) => T,
    getOrThrow: () => T,
    exists: () => boolean
}*/
const State = {
    useGeneric,
    useOptionalGeneric,
    useArray,
    useSet,
    useMap,
    useNumber,
    useString,
    useBoolean
};

export { Optional, State };
//# sourceMappingURL=index.js.map
