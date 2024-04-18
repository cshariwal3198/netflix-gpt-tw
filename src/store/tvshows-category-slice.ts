import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { popular: IMovie[], topRated: IMovie[], upcoming: IMovie[] } = {
    popular: [], topRated: [], upcoming: []
}

export const tvShowsCategorySlice = createSlice({
    name: 'tvShowsCategory',
    initialState,
    reducers: {
        addPopularTvShows: (store, action) => {
            store.popular = action.payload
        },
        addTopRatedTvShows: (store, action) => {
            store.topRated = action.payload
        },
        addUpcomingTvShows: (store, action) => {
            store.upcoming = action.payload
        }
    }
});

export const { reducer: tvShowsCategoriesReducer } = tvShowsCategorySlice;
export const { addPopularTvShows, addTopRatedTvShows, addUpcomingTvShows } = tvShowsCategorySlice.actions;
