import { useEffect, useState, useRef } from "react";

interface Size {
    width: number;
    height: number;
}

export const useResizeObserver = <T extends HTMLElement = HTMLElement>() => {
    const targetRef = useRef<T | null>(null);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });

        resizeObserver.observe(target);

        return () => {
            resizeObserver.disconnect();
        };
    }, [targetRef]);

    return { targetRef, size };
};