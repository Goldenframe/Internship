import { useEffect } from "react";

export function useInfiniteScroll<T>(callback: (arg: T) => void, arg: T, hasMore: boolean, loading: boolean){
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight - 100 &&
                hasMore &&
                !loading
            ) {
                callback(arg);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading, callback, arg]);
}