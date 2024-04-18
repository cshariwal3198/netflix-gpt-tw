import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { movie: IMovie[], tvshow: IMovie[] } = {
    movie: [], tvshow: []
};

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addToFavourites: (store, action) => {
            const { item, type } = action.payload;
            if (!store[type as keyof typeof store]?.some(({ id }) => (item.id === id))) {
                store[type as keyof typeof store].push(item)
            }
        },
        removeFromFavourites(store, action) {
            const { type } = action.payload;
            store[type as keyof typeof store].filter(({ id }) => (id !== action.payload.id))
        }
    }
});

export const { reducer: favouritesReducer } = favouritesSlice;
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
