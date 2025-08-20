import { Route, Routes } from "react-router-dom";

import { Favorites } from "@/pages/favorites";
import { Home } from "@/pages/home/ui/home";
import { Book } from "@/shared/model/types/books";

interface AppRouterProps {
    setBookClicked: React.Dispatch<React.SetStateAction<Book | null>>,
}

export const AppRouter = ({
    setBookClicked,
}: AppRouterProps) => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        setBookClicked={setBookClicked}
                    />
                }
            />
            <Route
                path="/favorites"
                element={
                    <Favorites
                        setBookClicked={setBookClicked}
                    />
                }
            />
        </Routes>
    );
};