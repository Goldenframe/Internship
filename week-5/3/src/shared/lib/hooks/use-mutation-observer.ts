import { useEffect, useRef, RefObject } from "react";

type Options = MutationObserverInit;

export const useMutationObserver = <T extends HTMLElement = HTMLElement>(
    targetRef: RefObject<T | null>,
    opts?: Options
) => {
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

        if (!observerRef.current) {
            observerRef.current = new MutationObserver((mutationList) => {

                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        console.log("A child node has been added or removed.");
                    } else if (mutation.type === "attributes") {
                        console.log(`The ${mutation.attributeName} attribute was modified.`);
                    } else if (mutation.type === "characterData") {
                        console.log("Character data changed.");
                    }
                }
            });
        }

        observerRef.current.observe(target, config);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [opts?.attributes, opts?.childList, opts?.subtree]);

};
