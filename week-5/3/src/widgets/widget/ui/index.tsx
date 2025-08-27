import { useRef, useState } from "react";

import { useMutationObserver } from "@/shared/lib/hooks/use-mutation-observer";

import { useIntervalAppend } from "../lib/use-interval-append";

import styles from "./styles.module.scss";


export const Widget = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isAppending, setIsAppending] = useState(false);

    const callback = (mutationList: MutationRecord[]) => {

        for (const mutation of mutationList) {
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            } else if (mutation.type === "characterData") {
                console.log("Character data changed.");
            }
        }
    }

    useMutationObserver<HTMLDivElement>({ targetRef, callback });

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