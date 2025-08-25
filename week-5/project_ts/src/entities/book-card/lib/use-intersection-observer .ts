import { useEffect, useState, RefObject } from "react";

export const useIntersectionObserver = (    itemTargetElement: RefObject<Element | null>) => {

    const [isIntersecting, setIsIntersecting] = useState(false);
    const [views, setViews] = useState(0);


    useEffect(() => {
        const options = {
            root: document.getElementById("book-container"),
            rootMargin: "0px",
            threshold: 0.5,
        };

        if (!itemTargetElement.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    setViews((prev) => prev + 1);

                    const container = entry.target as HTMLElement;
                    const lazyImg = container.querySelector("img") as Element;

                    if (lazyImg instanceof HTMLImageElement) {
                        lazyImg.src = lazyImg.dataset.src || ""; 
                    }

                    observer.unobserve(lazyImg);
                }
            });
        }, options);

        observer.observe(itemTargetElement.current);

        return () => {
            observer.disconnect();
        };
    }, [itemTargetElement]);


    return { isIntersecting, views };
}