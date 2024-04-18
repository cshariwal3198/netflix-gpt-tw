import useSWR from "swr";
import { options } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { addPopularTvShows, addTopRatedTvShows, addUpcomingTvShows } from "../store/tvshows-category-slice";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetTvShowsBasedOnCategory = () => {

    const dispatch = useDispatch();
    const tvShowsCategory = useSelector((state: any) => (state.categories));

    const popular = useSWR('https://api.themoviedb.org/3/tv/popular?language=en-US&page=2', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=2', fetcher);
    const upcoming = useSWR('https://api.themoviedb.org/3/tv/upcoming?language=en-US&page=2', fetcher);

    useEffect(() => {
        if (!popular?.isLoading) {
            dispatch(addPopularTvShows(popular?.data?.results))
        }
        if (!topRated?.isLoading) {
            dispatch(addTopRatedTvShows(topRated?.data?.results))
        }
        if (!upcoming?.isLoading) {
            dispatch(addUpcomingTvShows(upcoming?.data?.results))
        }
    }, [dispatch, popular?.data?.results, popular.isLoading, topRated?.data?.results, topRated.isLoading, upcoming?.data?.results, upcoming.isLoading]);

    return useMemo(() => ({
        popular: tvShowsCategory?.popular, topRated: tvShowsCategory?.topRated, upcoming: tvShowsCategory?.upcoming
    }), [tvShowsCategory?.popular, tvShowsCategory?.topRated, tvShowsCategory?.upcoming])

}
