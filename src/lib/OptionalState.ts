import { useState } from 'react';
import { StateHandler } from './StateHandler.js';

export class Optional<T> {
    private value?: T;

    constructor(value?: T) {
        this.value = value;
    }

    public orElseGet = (resolver: () => T) => {
        if(this.exists()) return this.value;
        return resolver();
    }

    public orElseNull = () => {
        if(this.exists()) return this.value;
        return null;
    }

    public orElseUndefined = () => {
        if(this.exists()) return this.value;
        return undefined;
    }

    public orElseThrow = (resolver?: () => Error) => {
        if(this.exists()) return this.value;
        if(resolver) throw resolver();
        throw new Error();
    }

    public exists = () => {
        return this.value != undefined;
    }

    public equals = (other: Optional<T>) => {
        return other.orElseUndefined() === this.orElseUndefined();
    }

    public static empty = () => {
        return new Optional();
    }

    public static from = (value: any) => {
        return new Optional(value);
    }
}

export const useOptional = <T extends StateHandler<any>> (initial: Optional<T> | T | undefined) => {
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