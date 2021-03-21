import { useRef, useState } from "react";

export default function useStateRef<T>(initialValue: T): [T, (item: T) => void, React.MutableRefObject<T>] {
    const [stateValue, internalSetStateValue] = useState(initialValue);
    const stateRef = useRef(stateValue);
    const setStateValue = (data: T) => {
        stateRef.current = data;
        internalSetStateValue(data);
    };
    return [stateValue, setStateValue, stateRef];
}