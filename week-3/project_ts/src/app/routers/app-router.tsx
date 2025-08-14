import { Route, Routes } from "react-router-dom";

import { Favorites } from "@/pages/favorites-page/ui/favorites";
import { Home } from "@/pages/home-page/ui/home";
import { Book } from "@/shared/model/types/books";

interface AppRouterProps {
    favorites: Book[];
    setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
    setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
    filter: string;
    startIndex: number;
    setStartIndex: React.Dispatch<React.SetStateAction<number>>,
    hasMore: boolean;
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppRouter = ({
    favorites,
    setFavorites,
    setBookClicked,
    filter,
    startIndex,
    setStartIndex,
    hasMore,
    setHasMore,
}: AppRouterProps) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setBookClicked={setBookClicked}
                        filter={filter}
                        startIndex={startIndex}
                        setStartIndex={setStartIndex}
                        hasMore={hasMore}
                        setHasMore={setHasMore}
                    />
                }
            />
            <Route
                path="/favorites"
                element={
                    <Favorites
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setBookClicked={setBookClicked}
                    />
                }
            />
        </Routes>
    );
};
