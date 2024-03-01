import { useGeneric } from "./GenericState.js";
import { StateHandler } from "./StateHandler.js";

export type StringState = StateHandler<string> & {
    concat:     (value: string)     => void,
    append:     (value: string)     => void,
    prepend:    (value: string)     => void,
    size:       ()                  => number,
    length:     ()                  => number,
    equals:     (value: string)     => boolean,

    charAt:     (index: number) => string,
    charCodeAt: (index: number) => number,
    at:         (index: number) => string | undefined,

    slice:      (start?: number, end?: number) => string,
    substring:  (start: number, end?: number) => string,
    
    toUpperCase:()                                              => string,
    toLowerCase:()                                              => string,
    trim:       ()                                              => string,
    trimStart:  ()                                              => string,
    trimEnd:    ()                                              => string,
    padStart:   (targetLength: number, padString?: string)      => string,
    padEnd:     (targetLength: number, padString?: string)      => string,
    repeat:     (count: number)                                 => string,
    split:      (separator: string | RegExp, limit?: number)    => string[],
}
export const useString = (initial?: string) => {
    const state = useGeneric(initial ?? "");

    return {
        get:        state.get(),
        set:        (value: string) => state.set(value),
        concat:     (value: string) => state.set(state.get() + value),
        append:     (value: string) => state.set(state.get() + value),
        prepend:    (value: string) => state.set(value + state.get()),
        size:       ()              => state.get().length,
        length:     ()              => state.get().length,
        equals:     (value: string) => state.equals(value),

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