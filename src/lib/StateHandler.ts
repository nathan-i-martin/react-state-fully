import { useState } from "react";

export interface StateHandler<T> {
    get: T;
    set: (value: T)=>void;
}

export const useStateHandler = <T> (initial: T) => {
    const [ get, set ] = useState(initial);
    return { get: ()=>get, set };
}