import { useEffect, useRef, useState } from 'react';

type Options = IntersectionObserverInit & {
    countEachIntersect?: boolean;
};

export const useIntersectionObserver = <T extends Element>(opts?: Options) => {
    const targetRef = useRef<T | null>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isViewed, setIsViewed] = useState(false);
    const isViewedRef = useRef(false); 

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log(`${entry.target.id} вошла в область видимости`);
                        setIsIntersecting(true);
                        
                        if (!isViewedRef.current) {
                            console.log(`${entry.target.id} просмотрена`);
                            setIsViewed(true);
                            isViewedRef.current = true;
                        }

                        if (!opts?.countEachIntersect) {
                            observer.unobserve(entry.target);
                        }
                    } else {
                        setIsIntersecting(false);
                    }
                });
            },
            {
                root: null,
                rootMargin: opts?.rootMargin ?? '0px',
                threshold: opts?.threshold ?? 0.8,
            }
        );

        observer.observe(target);

        return () => observer.disconnect();
    }, [opts?.root, opts?.rootMargin, opts?.threshold, opts?.countEachIntersect]); 

    return { targetRef, isIntersecting, isViewed };
}