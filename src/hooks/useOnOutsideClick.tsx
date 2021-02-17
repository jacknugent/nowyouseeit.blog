import { useEffect } from "react";

export default function useOnOutsideClick(ref: React.MutableRefObject<any>, func: () => any) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target))
                func()
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);
}