import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: IMovie[] = [];

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addToFavourites: (store, action) => {
            store.push(action.payload)
        },
        removeFromFavourites(store, action) {
            return store.filter(({ id }) => (id !== action.payload))
        }
    }
});

export const { reducer: favouritesReducer } = favouritesSlice;
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;
