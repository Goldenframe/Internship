import { Route, Routes } from "react-router-dom";

import { Favorites } from "@/pages/favorites";
import { Home } from "@/pages/home/ui/home";
import { Book } from "@/shared/model/types/books";

interface AppRouterProps {
    favorites: Book[];
    setFavorites: React.Dispatch<React.SetStateAction<Book[]>>,
    setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
}

export const AppRouter = ({
    favorites,
    setFavorites,
    setBookClicked,
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