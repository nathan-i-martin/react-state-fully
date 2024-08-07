import { useState } from 'react';
import { GenericState } from './GenericState.js';

export class Optional<T> {
    private value?: T;

    /**
     * Constructs an Optional object that may or may not contain a non-null value.
     * @param value The value to be contained, if any.
     */
    constructor(value?: T) {
        this.value = value;
    }

    /**
     * Returns the value if present, otherwise returns the result produced by the resolver function.
     * @param resolver A function that produces a value to be returned if the Optional is empty.
     * @returns The value if present, otherwise the result of the resolver function.
     */
    public orElseGet = (resolver: () => T): T => {
        if(this.exists()) return this.value as T;
        return resolver();
    }

    /**
     * Returns the value if present, otherwise returns null.
     * @returns The value if present, otherwise null.
     */
    public orElseNull = (): T | null => {
        if(this.exists()) return this.value as T;
        return null;
    }

    /**
     * Returns the value if present, otherwise returns undefined.
     * @returns The value if present, otherwise undefined.
     */
    public orElseUndefined = () => this.value;

    /**
     * Returns the contained value if present, otherwise throws an error produced by the resolver function or a generic error if no resolver is provided.
     * @param resolver An optional function that produces an error to be thrown if the Optional is empty.
     * @throws Error produced by the resolver or a generic error if the Optional is empty.
     */
    public orElseThrow = (resolver?: () => Error): T => {
        if(this.exists()) return this.value as T;
        if(resolver) throw resolver();
        throw new Error("Optional is empty.");
    }

    /**
     * Checks whether the Optional contains a value.
     * @returns True if there is a value present, otherwise false.
     */
    public exists = () => this.value != undefined;

    /**
     * Compares the contained value with another Optional's value for equality.
     * @param other Another Optional object to compare with.
     * @returns True if both Optionals contain equal values or are both empty, otherwise false.
     */
    public equals = (other: Optional<T>) => other.orElseUndefined() === this.orElseUndefined();

    /**
     * Creates an empty Optional instance.
     * @returns An empty Optional object.
     */
    public static empty = () => new Optional<any>();

    /**
     * Creates an Optional from a given value.
     * @param value The value to create an Optional for.
     * @returns An Optional containing the given value.
     */
    public static of = <T> (value: T) => new Optional(value);
}

export type OptionalState<T> = GenericState<T> & Optional<T> & {
    set: (value: Optional<T> | T | undefined)            => void,
};
export const useOptional = <T> (initial?: Optional<T> | T) => {
    const [state, setState] = useState(initial instanceof Optional ? initial : new Optional(initial));

    return {
        get:                () => state,
        set:                (value: Optional<T> | T | undefined)            => setState(value instanceof Optional ? value : new Optional(value)),
        equals:             (value: Optional<T>)                            => state.equals(value),
        compute:            (callback: (value: Optional<T>)=>Optional<T>)   => {setState(callback(state))},

        orElseGet:          (resolver: () => T)                             => state.orElseGet(resolver),
        orElseNull:         ()                                              => state.orElseNull(),
        orElseUndefined:    ()                                              => state.orElseUndefined(),
        orElseThrow:        (resolver?: () => Error)                        => state.orElseThrow(resolver),
        exists:             ()                                              => state.exists(),
    } as OptionalState<T>;
}