import { useState } from 'react';

const useStateHandler = (initial) => {
    const [get, set] = useState(initial);
    return { get: () => get, set };
};

const useGeneric = (initial) => {
    const state = useStateHandler(initial);
    return {
        get: state.get,
        set: state.set,
        equals: (value) => value === state.get(),
    };
};

const useArray = (initial) => {
    const state = useGeneric(initial ?? []);
    return {
        get: state.get,
        set: state.set,
        getValue: (index) => state.get()[index],
        getFirstValue: () => state.get()[0],
        getLastValue: () => state.get()[state.get().length - 1],
        add: (item) => state.set([...state.get(), item]),
        put: (index, value) => { const newArray = [...state.get()]; newArray[index] = value; state.set(newArray); },
        remove: (index) => { const newArray = [...state.get()]; newArray.splice(index, 1); state.set(newArray); },
        contains: (item) => state.get().includes(item),
        size: () => state.get().length,
        clear: () => state.set([]),
        isEmpty: () => state.get().length == 0,
        map: (callback, thisArg) => state.get().map(callback, thisArg),
        forEach: (callback, thisArg) => state.get().forEach(callback, thisArg),
        filter: (predicate, thisArg) => state.get().filter(predicate, thisArg),
        mutateFilter: (predicate, thisArg) => { const o = state.get().filter(predicate, thisArg); state.set(o); return o; },
        reduce: (callbackfn) => state.get().reduce(callbackfn),
        find: (predicate, thisArg) => state.get().find(predicate, thisArg),
        some: (predicate, thisArg) => state.get().some(predicate, thisArg),
        every: (predicate, thisArg) => state.get().every(predicate, thisArg),
        at: (index) => state.get().at(index),
        join: (separator) => state.get().join(separator),
        concat: (...arrays) => state.get().concat(...arrays),
        indexOf: (searchElement, fromIndex) => state.get().indexOf(searchElement, fromIndex),
        lastIndexOf: (searchElement, fromIndex) => state.get().lastIndexOf(searchElement, fromIndex),
        includes: (searchElement, fromIndex) => state.get().includes(searchElement, fromIndex),
        slice: (start, end) => state.get().slice(start, end),
        pop: () => { const a = [...state.get()]; const o = a.pop(); state.set(a); return o; },
        push: (...items) => { const a = [...state.get()]; const o = a.push(...items); state.set(a); return o; },
        copyWithin: (target, start, end) => { const a = [...state.get()]; const o = a.copyWithin(target, start, end); state.set(a); return o; },
        fill: (value, start, end) => { const a = [...state.get()]; const o = a.fill(value, start, end); state.set(a); return o; },
        reverse: () => { const a = [...state.get()]; const o = a.reverse(); state.set(a); return o; },
        shift: () => { const a = [...state.get()]; const o = a.shift(); state.set(a); return o; },
        unshift: (...items) => { const a = [...state.get()]; const o = a.unshift(...items); state.set(a); return o; },
        splice: (start, deleteCount) => { const a = [...state.get()]; const o = a.splice(start, deleteCount); state.set(a); return o; },
        removeDuplicates: () => state.set([...new Set(state.get())]),
    };
};

const useBoolean = (initial) => {
    const state = useGeneric(initial ?? false);
    return {
        get: state.get,
        set: state.set,
        toggle: () => state.set(!state.get()),
        equals: (value) => state.equals(value),
        true: () => state.set(true),
        false: () => state.set(false),
    };
};

const useMap = (initial) => {
    const state = useGeneric(initial ?? new Map());
    return {
        get: state.get,
        set: state.set,
        getValue: (key) => state.get().get(key),
        put: (key, value) => state.set(new Map(state.get()).set(key, value)),
        remove: (key) => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        delete: (key) => { const newMap = new Map(state.get()); newMap.delete(key); state.set(newMap); },
        contains: (key) => state.get().has(key),
        has: (key) => state.get().has(key),
        size: () => state.get().size,
        clear: () => state.set(new Map()),
        isEmpty: () => state.get().size == 0,
        map: (callback, thisArg) => {
            const map = state.get();
            const result = [];
            let index = 0;
            for (const entry of map.entries()) {
                const cbResult = callback.call(thisArg, entry, index, Array.from(map.entries()));
                result.push(cbResult);
                index++;
            }
            return result;
        },
        forEach: (callback, thisArg) => {
            const map = state.get();
            let index = 0;
            for (const entry of map.entries()) {
                callback.call(thisArg, entry, index, Array.from(map.entries()));
                index++;
            }
        },
        entries: () => state.get().entries(),
        keys: () => state.get().keys(),
        values: () => state.get().values(),
    };
};

const useNumber = (initial) => {
    const state = useGeneric(initial ?? 0);
    return {
        get: state.get,
        set: state.set,
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

class Optional {
    value;
    /**
     * Constructs an Optional object that may or may not contain a non-null value.
     * @param value The value to be contained, if any.
     */
    constructor(value) {
        this.value = value;
    }
    /**
     * Returns the value if present, otherwise returns the result produced by the resolver function.
     * @param resolver A function that produces a value to be returned if the Optional is empty.
     * @returns The value if present, otherwise the result of the resolver function.
     */
    orElseGet = (resolver) => {
        if (this.exists())
            return this.value;
        return resolver();
    };
    /**
     * Returns the value if present, otherwise returns null.
     * @returns The value if present, otherwise null.
     */
    orElseNull = () => {
        if (this.exists())
            return this.value;
        return null;
    };
    /**
     * Returns the value if present, otherwise returns undefined.
     * @returns The value if present, otherwise undefined.
     */
    orElseUndefined = () => {
        if (this.exists())
            return this.value;
        return undefined;
    };
    /**
     * Returns the contained value if present, otherwise throws an error produced by the resolver function or a generic error if no resolver is provided.
     * @param resolver An optional function that produces an error to be thrown if the Optional is empty.
     * @throws Error produced by the resolver or a generic error if the Optional is empty.
     */
    orElseThrow = (resolver) => {
        if (this.exists())
            return this.value;
        if (resolver)
            throw resolver();
        throw new Error();
    };
    /**
     * Checks whether the Optional contains a value.
     * @returns True if there is a value present, otherwise false.
     */
    exists = () => {
        return this.value != undefined;
    };
    /**
     * Compares the contained value with another Optional's value for equality.
     * @param other Another Optional object to compare with.
     * @returns True if both Optionals contain equal values or are both empty, otherwise false.
     */
    equals = (other) => {
        return other.orElseUndefined() === this.orElseUndefined();
    };
    /**
     * Creates an empty Optional instance.
     * @returns An empty Optional object.
     */
    static empty = () => {
        return new Optional();
    };
    /**
     * Creates an Optional from a given value.
     * @param value The value to create an Optional for.
     * @returns An Optional containing the given value.
     */
    static from = (value) => {
        return new Optional(value);
    };
}
const useOptional = (initial) => {
    const [state, setState] = useState(initial instanceof Optional ? initial : new Optional(initial));
    return {
        get: state,
        set: (value) => setState(value instanceof Optional ? value : new Optional(value)),
        orElseGet: (resolver) => state.orElseGet(resolver),
        orElseNull: () => state.orElseNull(),
        orElseUndefined: () => state.orElseUndefined(),
        orElseThrow: (resolver) => state.orElseThrow(resolver),
        exists: () => state.exists(),
        equals: (value) => state.equals(value),
    };
};

const useSet = (initial) => {
    const state = useGeneric(initial ?? new Set());
    return {
        get: state.get,
        set: state.set,
        add: (item) => state.set(new Set([...state.get(), item])),
        remove: (item) => { const a = new Set(state.get()); const o = a.delete(item); state.set(a); return o; },
        delete: (item) => { const a = new Set(state.get()); const o = a.delete(item); state.set(a); return o; },
        contains: (item) => state.get().has(item),
        has: (item) => state.get().has(item),
        size: () => state.get().size,
        clear: () => state.set(new Set()),
        isEmpty: () => state.get().size == 0,
        map: (callback, thisArg) => Array.from(state.get()).map(callback, thisArg),
        forEach: (callback, thisArg) => state.get().forEach(callback, thisArg),
        entries: () => state.get().entries(),
        keys: () => state.get().keys(),
        values: () => state.get().values(),
        toArray: () => [...state.get()],
    };
};

const useString = (initial) => {
    const state = useGeneric(initial ?? "");
    return {
        get: state.get,
        set: state.set,
        concat: (value) => state.set(state.get() + value),
        append: (value) => state.set(state.get() + value),
        prepend: (value) => state.set(value + state.get()),
        size: () => state.get().length,
        length: () => state.get().length,
        equals: (value) => state.equals(value),
        charAt: (index) => state.get().charAt(index),
        charCodeAt: (index) => state.get().charCodeAt(index),
        at: (index) => state.get().at(index),
        slice: (start, end) => state.get().slice(start, end),
        substring: (start, end) => state.get().substring(start, end),
        toUpperCase: () => state.get().toUpperCase(),
        toLowerCase: () => state.get().toLowerCase(),
        trim: () => state.get().trim(),
        trimStart: () => state.get().trimStart(),
        trimEnd: () => state.get().trimEnd(),
        padStart: (maxLength, fillString) => state.get().padStart(maxLength, fillString),
        padEnd: (maxLength, fillString) => state.get().padEnd(maxLength, fillString),
        repeat: (count) => state.get().repeat(count),
        split: (separator, limit) => state.get().split(separator, limit),
    };
};

const State = {
    useGeneric,
    useOptional,
    useArray,
    useSet,
    useMap,
    useNumber,
    useString,
    useBoolean,
};

export { Optional, State };
//# sourceMappingURL=index.js.map
