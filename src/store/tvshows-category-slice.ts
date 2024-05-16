import { createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../types";

const initialState: { popular: IMovie[], topRated: IMovie[], upcoming: IMovie[], trending: IMovie[] } = {
    popular: [], topRated: [], upcoming: [], trending: []
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
        },
        addTrendingTvShows(store, action) {
            store.trending = action.payload;
        }
    }
});

export const { reducer: tvShowsCategoriesReducer } = tvShowsCategorySlice;
export const { addPopularTvShows, addTopRatedTvShows, addUpcomingTvShows, addTrendingTvShows } = tvShowsCategorySlice.actions;
