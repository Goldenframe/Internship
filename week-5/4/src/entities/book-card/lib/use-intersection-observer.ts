import { useUnit } from 'effector-react';
import { useEffect, useRef, useState } from 'react';

import { model } from '../model/book-model';

type Options = IntersectionObserverInit & {
    countEachIntersect?: boolean;
};

export const useIntersectionObserver = <T extends Element>(opts?: Options) => {
    const [bookViewed] = useUnit([model.bookViewed])
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
                            bookViewed(entry.target.id);
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
    }, [opts?.root, opts?.rootMargin, opts?.threshold, opts?.countEachIntersect, bookViewed]);

    return { targetRef, isIntersecting, isViewed };
}