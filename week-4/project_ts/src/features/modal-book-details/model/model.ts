import { fork, sample } from "effector";
import { debug } from "patronum";

import { tUpdated } from "@/entities/book-card/model/book-model/events";
import { $t } from "@/entities/book-card/model/book-model/stores";

import { fetchBookDetailsFx } from "./effects";
import { bookDetailsClosed, bookDetailsOpened, scopeCreated } from "./events";
import { $bookDetails, $isLoading, $scope, } from "./stores";

sample({ clock: bookDetailsClosed, fn: () => null, target: $bookDetails });
sample({ clock: bookDetailsClosed, fn: () => true, target: $isLoading });
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

debug({ trace: true }, $scope);

export const model = {
    bookDetailsOpened,
    bookDetailsClosed,
    tUpdated,
    $bookDetails,
    $isLoading,
    $scope,
    $t,
    fetchBookDetailsFx,
};
