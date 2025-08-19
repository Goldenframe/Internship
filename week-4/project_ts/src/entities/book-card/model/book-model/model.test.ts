import { allSettled, fork } from "effector"
import { model } from "./model";
import { MAX_RESULT } from "./config";

describe("Books Model", () => {
    test("startIndexUpdated should update startIndex", async () => {
        const scope = fork();
        expect(scope.getState(model.$startIndex)).toBe(0);
        await allSettled(model.startIndexUpdated, { scope, params: 5 });
        expect(scope.getState(model.$startIndex)).toBe(5);
    });

    test("searchInput should update query", async () => {
        const scope = fork();
        await allSettled(model.searchInputUpdated, { scope, params: "css" });
        await allSettled(model.searchFormSubmitted, { scope });
        expect(scope.getState(model.$query)).toBe("css");
    });

    test('hasMoreUpdated should update hasMore', async () => {
        const scope = fork();
        expect(scope.getState(model.$hasMore)).toEqual(true);
        await allSettled(model.hasMoreUpdated, {
            scope,
            params: false
        });
        expect(scope.getState(model.$hasMore)).toEqual(false);
    });

    test('filterUpdated should update filter', async () => {
        const scope = fork();
        expect(scope.getState(model.$filter)).toEqual('');
        await allSettled(model.filterUpdated, {
            scope,
            params: 'free'
        });
        expect(scope.getState(model.$filter)).toEqual('free');
    });

    test('resetPagination should reset startIndex and hasMore', async () => {
        const scope = fork();
        await allSettled(model.startIndexUpdated, { scope, params: 10 });
        await allSettled(model.hasMoreUpdated, { scope, params: false });
        await allSettled(model.resetPagination, { scope });
        expect(scope.getState(model.$startIndex)).toBe(0);
        expect(scope.getState(model.$hasMore)).toBe(false);
    });

});
