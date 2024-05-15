import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { recentlyOpenedShows: IMovie[] } = { recentlyOpenedShows: [] };

export const recentlyOpenedSlice = createSlice({
    name: 'recentlyOpened',
    initialState,
    reducers: {
        addRecentlyOpenedShows: (store, action) => {
            const { recentlyOpenedShows } = store;
            if (!recentlyOpenedShows.find(({ id }) => (id === action.payload.id))) {
                recentlyOpenedShows.push(action.payload);
            }
        },
        clearRecentlyOpenedShows: (store) => {
            store.recentlyOpenedShows.length = 0;
        }
    }
});

export const { reducer: recentlyOpenedShowsReducer } = recentlyOpenedSlice;
export const { addRecentlyOpenedShows, clearRecentlyOpenedShows } = recentlyOpenedSlice.actions;
