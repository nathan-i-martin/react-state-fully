import { GenericState, useGeneric } from "./GenericState.js";

export type StringState = GenericState<string> & {
    /** Concatenates the given string value to the current string state and updates the state with the new value. */
    concat:     (value: string)     => void,
    /** Appends the given string value to the end of the current string state and updates the state with the new value. */
    append:     (value: string)     => void,
    /** Prepends the given string value to the beginning of the current string state and updates the state with the new value. */
    prepend:    (value: string)     => void,
    /** Returns the size (length) of the current string state. */
    size:       ()                  => number,
    /** Returns the length of the current string state. */
    length:     ()                  => number,

    /** Returns the character at the specified index from the current string state. */
    charAt:     (index: number) => string,
    /** Returns the Unicode value of the character at the specified index from the current string state. */
    charCodeAt: (index: number) => number,
    /** Returns the character at the specified index from the current string state or undefined if out of bounds. */
    at:         (index: number) => string | undefined,

    /** Extracts a section of the current string state and returns it as a new string, without modifying the original string. */
    slice:      (start?: number, end?: number) => string,
    /** Returns the part of the string between the start and end indexes, or to the end of the string. */
    substring:  (start: number, end?: number) => string,
    
    /** Converts all the alphabetic characters in the current string state to uppercase. */
    toUpperCase:()                                              => string,
    /** Converts all the alphabetic characters in the current string state to lowercase. */
    toLowerCase:()                                              => string,
    /** Trims whitespace from both ends of the current string state. */
    trim:       ()                                              => string,
    /** Trims whitespace from the beginning of the current string state. */
    trimStart:  ()                                              => string,
    /** Trims whitespace from the end of the current string state. */
    trimEnd:    ()                                              => string,
    /** Pads the current string state from the start (left) with the given string until the target length is reached. */
    padStart:   (targetLength: number, padString?: string)      => string,
    /** Pads the current string state from the end (right) with the given string until the target length is reached. */
    padEnd:     (targetLength: number, padString?: string)      => string,
    /** Returns a new string consisting of the elements of the current string state repeated the given number of times. */
    repeat:     (count: number)                                 => string,
    /** Splits the current string state into an array of strings by separating the string into substrings. */
    split:      (separator: string | RegExp, limit?: number)    => string[],
}
export const useString = (initial?: string) => {
    const state = useGeneric(initial ?? "");

    return {
        get:        state.get,
        set:        state.set,
        compute:    state.compute,
        equals:     state.equals,

        concat:     (value: string) => state.set(state.get() + value),
        append:     (value: string) => state.set(state.get() + value),
        prepend:    (value: string) => state.set(value + state.get()),
        size:       ()              => state.get().length,
        length:     ()              => state.get().length,

        charAt:     (index: number) => state.get().charAt(index),
        charCodeAt: (index: number) => state.get().charCodeAt(index),
        at:         (index: number) => state.get().at(index),

        slice:      (start?: number, end?: number) => state.get().slice(start, end),
        substring:  (start: number, end?: number) => state.get().substring(start, end),
        
        toUpperCase:()                                              => state.get().toUpperCase(),
        toLowerCase:()                                              => state.get().toLowerCase(),
        trim:       ()                                              => state.get().trim(),
        trimStart:  ()                                              => state.get().trimStart(),
        trimEnd:    ()                                              => state.get().trimEnd(),
        padStart:   (maxLength: number, fillString?: string)        => state.get().padStart(maxLength, fillString),
        padEnd:     (maxLength: number, fillString?: string)        => state.get().padEnd(maxLength, fillString),
        repeat:     (count: number)                                 => state.get().repeat(count),
        split:      (separator: string | RegExp, limit?: number)    => state.get().split(separator, limit),
    } as StringState;
}