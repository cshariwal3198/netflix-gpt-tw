import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { allMovies: IMovie[], popular: IMovie[], topRated: IMovie[], upcoming: IMovie[] } = {
    allMovies: [], popular: [], topRated: [], upcoming: []
}

export const moviesCategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addAllMovies: (store, action) => {
            store.allMovies = action.payload
        },
        addPopularMovies: (store, action) => {
            store.popular = action.payload
        },
        addTopRatedMovies: (store, action) => {
            store.topRated = action.payload
        },
        addUpcomingMovies: (store, action) => {
            store.upcoming = action.payload
        }
    }
});

export const { reducer: moviesCategoryReducer } = moviesCategorySlice;
export const { addPopularMovies, addTopRatedMovies, addUpcomingMovies, addAllMovies } = moviesCategorySlice.actions;
