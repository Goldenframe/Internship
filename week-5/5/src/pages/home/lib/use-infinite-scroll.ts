import { useEffect } from "react";

export const useInfiniteScroll = (callback: () => void, hasMore: boolean, status: string) => {
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight - 100 &&
                hasMore &&
                status!=="pending"
            ) {
                callback();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, status, callback]);
}