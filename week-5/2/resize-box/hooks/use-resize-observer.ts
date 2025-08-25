import { RefObject, useEffect, useState, useRef } from "react";

type Options = IntersectionObserverInit & {
    countEachIntersect?: boolean;
};


export const useResizeObserver = <T extends Element>(element: RefObject<Element | null>) => {
    const targetRef = useRef<T | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!element.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setWidth(width);
                setHeight(height);
            }
        });

        resizeObserver.observe(element.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, [element]);

    return {width, height };
};

// import { useEffect, useRef, useState } from 'react';

// type Options = IntersectionObserverInit & {
//     countEachIntersect?: boolean;
// };

// export function useIntersectionObserver<T extends Element>(opts?: Options) {
//     const targetRef = useRef<T | null>(null);
//     const [isIntersecting, setIsIntersecting] = useState(false);
//     const [isViewed, setIsViewed] = useState(false);
//     const isViewedRef = useRef(false); 

//     useEffect(() => {
//         if (typeof window === 'undefined') return;
//         const target = targetRef.current;
//         if (!target) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 entries.forEach((entry) => {
//                     if (entry.isIntersecting) {
//                         console.log(`${entry.target.id} вошла в область видимости`);
//                         setIsIntersecting(true);
                        
//                         if (!isViewedRef.current) {
//                             console.log(`${entry.target.id} просмотрена`);
//                             setIsViewed(true);
//                             isViewedRef.current = true;
//                         }

//                         if (!opts?.countEachIntersect) {
//                             observer.unobserve(entry.target);
//                         }
//                     } else {
//                         setIsIntersecting(false);
//                     }
//                 });
//             },
//             {
//                 root: null,
//                 rootMargin: opts?.rootMargin ?? '0px',
//                 threshold: opts?.threshold ?? 0.8,
//             }
//         );

//         observer.observe(target);

//         return () => observer.disconnect();
//     }, [opts?.root, opts?.rootMargin, opts?.threshold, opts?.countEachIntersect]); 

//     return { targetRef, isIntersecting, isViewed };
// }