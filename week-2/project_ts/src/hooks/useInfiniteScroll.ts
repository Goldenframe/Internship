import { useEffect } from "react";

export default function useInfiniteScroll<T>(callback: () => void, hasMore: boolean, loading: boolean){
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.offsetHeight - 100 &&
                hasMore &&
                !loading
            ) {
                callback();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasMore, loading]);
}
