import { useState } from "react";

export interface StateHandler<T> {
    /**
     * Fetches the raw state that this state handler is holding.
     * Mutations to the returned value must be properly stored.
     */
    get: () => T;

    /**
     * Set's a value as the new state for this state handler.
     * @param value The value to set.
     */
    set: (value: T) => void;
}

export const useStateHandler = <T> (initial: T) => {
    const [ get, set ] = useState(initial);

    return { get: () => get, set } as StateHandler<T>;
}