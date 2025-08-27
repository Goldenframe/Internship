import { useEffect, useState, useRef, useLayoutEffect, RefObject } from "react";

interface Size {
    width: number;
    height: number;
}

export const useResizeObserver = <T extends HTMLElement = HTMLElement>(targetRef: RefObject<T | null>) => {
    const observerRef = useRef<ResizeObserver | null>(null);
    const frameRef = useRef<number | null>(null);
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const target = targetRef.current;
        if (!target) return;

        const rect = target.getBoundingClientRect();
        setSize({
            width: rect.width,
            height: rect.height
        });
    }, []);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        if (!observerRef.current) {
            observerRef.current = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { width, height } = entry.contentRect;
                    if (frameRef.current) {
                        cancelAnimationFrame(frameRef.current);
                    }
                    frameRef.current = requestAnimationFrame(() => {
                        setSize({ width, height });
                    });
                }
            });
        }

        observerRef.current.observe(target);

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            if (observerRef.current) observerRef.current.unobserve(target);

        };
    }, []);

    return { size };
};