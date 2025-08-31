import { Route, Routes } from "react-router-dom";

import { Favorites } from "@/pages/favorites";
import { Home } from "@/pages/home/ui/home";
import { SessionFavorites } from "@/pages/session-favorites";


export const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                    />
                }
            />
            <Route
                path="/favorites"
                element={
                    <Favorites
                    />
                }
            />
            <Route
                path="/session-favorites"
                element={
                    <SessionFavorites
                    />
                }
            />
        </Routes>
    );
};