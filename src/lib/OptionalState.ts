import { useState } from 'react';
import { StateHandler } from './StateHandler.js';

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
    public orElseGet = (resolver: () => T) => {
        if(this.exists()) return this.value;
        return resolver();
    }

    /**
     * Returns the value if present, otherwise returns null.
     * @returns The value if present, otherwise null.
     */
    public orElseNull = () => {
        if(this.exists()) return this.value;
        return null;
    }

    /**
     * Returns the value if present, otherwise returns undefined.
     * @returns The value if present, otherwise undefined.
     */
    public orElseUndefined = () => {
        if(this.exists()) return this.value;
        return undefined;
    }

    /**
     * Returns the contained value if present, otherwise throws an error produced by the resolver function or a generic error if no resolver is provided.
     * @param resolver An optional function that produces an error to be thrown if the Optional is empty.
     * @throws Error produced by the resolver or a generic error if the Optional is empty.
     */
    public orElseThrow = (resolver?: () => Error) => {
        if(this.exists()) return this.value;
        if(resolver) throw resolver();
        throw new Error();
    }

    /**
     * Checks whether the Optional contains a value.
     * @returns True if there is a value present, otherwise false.
     */
    public exists = () => {
        return this.value != undefined;
    }

    /**
     * Compares the contained value with another Optional's value for equality.
     * @param other Another Optional object to compare with.
     * @returns True if both Optionals contain equal values or are both empty, otherwise false.
     */
    public equals = (other: Optional<T>) => {
        return other.orElseUndefined() === this.orElseUndefined();
    }

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

export const useOptional = <T> (initial: Optional<T> | T | undefined) => {
    const [state, setState] = useState(initial instanceof Optional ? initial : new Optional(initial));

    return {
        get:                state,
        set:                (value: Optional<T> | T | undefined)    => setState(value instanceof Optional ? value : new Optional(value)),
        orElseGet:          (resolver: () => T)                     => state.orElseGet(resolver),
        orElseNull:         ()                                      => state.orElseNull(),
        orElseUndefined:    ()                                      => state.orElseUndefined(),
        orElseThrow:        (resolver?: () => Error)                => state.orElseThrow(resolver),
        exists:             ()                                      => state.exists(),
        equals:             (value: Optional<T>)                    => state.equals(value),
    } as StateHandler<T> | Optional<T>;
}