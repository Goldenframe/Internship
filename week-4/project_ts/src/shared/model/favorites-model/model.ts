import { createEffect, merge, sample } from "effector";
import { favoritesLoaded, favoritesSaved, favoriteToggled } from "./events";
import { FavoritesGate } from "./gates";
import { $favorites } from "./stores";
import { getFavorites } from "@/shared/lib/utils/local-storage/favorites";
import { saveFavoritesFx } from "./effects";


export const model = {
    FavoritesGate,
    $favorites,
    favoritesLoaded,
    favoritesSaved,
    favoriteToggled,
    saveFavoritesFx
}

sample({
    clock: favoritesLoaded,
    target: $favorites,
})

sample({
  clock: favoriteToggled,
  source: $favorites,
  fn: (favorites, book) => {
    const isFavorite = favorites.some(fav => fav.id === book.id);
    return isFavorite
      ? favorites.filter(fav => fav.id !== book.id)
      : [...favorites, book];
  },
  target: $favorites,
});


sample({
    clock: FavoritesGate.open,
    fn: () => getFavorites(),
    target: favoritesLoaded,
});

sample({
    clock: FavoritesGate.close,
    source: $favorites,
    target: favoritesSaved,
});

sample({
    clock: merge([favoritesSaved, favoriteToggled]),
    source: $favorites, 
    target: saveFavoritesFx
});
