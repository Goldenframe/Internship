import { useRef, useState } from "react";

import { useMutationObserver } from "@/shared/lib/hooks/use-mutation-observer";

import { useIntervalAppend } from "../lib/use-interval-append";

import styles from "./styles.module.scss";


export const Widget = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isAppending, setIsAppending] = useState(false);

    useMutationObserver<HTMLDivElement>(targetRef);

    useIntervalAppend({
        targetRef,
        isActive: isAppending,
        createElement: () => {
            const box = document.createElement("div");
            box.innerHTML = "div";
            box.className = styles.box;
            return box;
        },
        intervalMs: 2000,
    });

    return (
        <div className={styles.widgetContainer} ref={targetRef}>
            <button
                className={styles.toggleButton}
                onClick={() => setIsAppending((prev) => !prev)}
            >
                {isAppending ? "Stop appending children" : "Start appending children"}
            </button>
        </div>
    );
};