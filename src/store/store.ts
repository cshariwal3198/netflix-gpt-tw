import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { favouritesReducer } from "./favourites-slice";

export const store = configureStore({
    reducer: {
        favourites: favouritesReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
