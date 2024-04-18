import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { popular: IMovie[], topRated: IMovie[], upcoming: IMovie[] } = {
    popular: [], topRated: [], upcoming: []
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addPopularMovies: (store, action) => {
            store.popular.push(...action.payload)
        },
        addTopRatedMovies: (store, action) => {
            store.topRated.push(...action.payload)
        },
        addUpcomingMovies: (store, action) => {
            store.upcoming.push(...action.payload)
        }
    }
});

export const { reducer: categoryReducer } = categorySlice;
export const { addPopularMovies, addTopRatedMovies, addUpcomingMovies } = categorySlice.actions;
