import { useEffect, useRef, RefObject } from "react";

type Options = MutationObserverInit;

interface UseMutationObserverProps<T extends HTMLElement = HTMLElement> {
    targetRef: RefObject<T | null>;
    callback: MutationCallback;
    opts?: Options;
}

export const useMutationObserver = <T extends HTMLElement = HTMLElement>({
    targetRef,
    callback,
    opts
}: UseMutationObserverProps<T>) => {
    const observerRef = useRef<MutationObserver | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const target = targetRef.current;
        if (!target) return;

        const config: MutationObserverInit = {
            attributes: opts?.attributes ?? false,
            childList: opts?.childList ?? true,
            subtree: opts?.subtree ?? false,
        };
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }

        observerRef.current = new MutationObserver(callback);


        observerRef.current.observe(target, config);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null
            };
        };
    }, [opts?.attributes, opts?.childList, opts?.subtree, callback, targetRef]);

};
