import { tUpdated } from "@/entities/book-card/model/book-model/events";
import { bookDetailsClosed, bookDetailsOpened, favoriteToggled, scopeCreated, favoritesUpdated } from "./events";
import { $bookDetails, $isFavorite, $isLoading, $scope, $favorites } from "./stores";
import { $t } from "@/entities/book-card/model/book-model/stores";
import { fetchBookDetailsFx } from "./effects";
import { fork, merge, sample } from "effector";

export const model = {
    bookDetailsOpened,
    bookDetailsClosed,
    tUpdated,
    favoritesUpdated,
    favoriteToggled,
    $bookDetails,
    $isLoading,
    $isFavorite,
    $favorites,
    $scope,
    $t,
    fetchBookDetailsFx,
};


sample({
    clock: favoritesUpdated,
    fn: (favorites) => favorites || [],
    target: $favorites
});

sample({
    clock: favoriteToggled,
    source: $favorites,
    fn: (favorites, book) => {
        const isFav = favorites.some(b => b.id === book.id);
        return isFav
            ? favorites.filter(b => b.id !== book.id)
            : [...favorites, book];
    },
    target: $favorites
});

sample({
    clock: merge([$bookDetails, $favorites, bookDetailsOpened, favoritesUpdated]),
    source: { bookDetails: $bookDetails, favorites: $favorites },
    fn: ({ bookDetails, favorites }) => bookDetails ? favorites.some(book => book.id === bookDetails.id) : false,
    target: $isFavorite
});

sample({ clock: bookDetailsClosed, fn: () => null, target: $bookDetails });
sample({ clock: bookDetailsClosed, fn: () => true, target: $isLoading });
sample({ clock: bookDetailsClosed, fn: () => false, target: $isFavorite });
sample({ clock: bookDetailsClosed, fn: () => null, target: $scope });
sample({ clock: fetchBookDetailsFx.doneData, target: $bookDetails });
sample({ clock: fetchBookDetailsFx.pending, target: $isLoading });
sample({ clock: scopeCreated, target: $scope });
sample({ clock: tUpdated, target: $t });

sample({
    clock: bookDetailsOpened,
    fn: () => fork({
        values: [
            [$bookDetails, null],
            [$isLoading, true],
            [$isFavorite, false],
            [$scope, null]
        ]
    }),
    target: scopeCreated
});

sample({
    clock: bookDetailsOpened,
    source: { t: $t },
    fn: ({ t }, bookId) => ({ bookId, t }),
    target: fetchBookDetailsFx
});