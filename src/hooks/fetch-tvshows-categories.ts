import useSWR from "swr";
import { options } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { addPopularTvShows, addTopRatedTvShows, addUpcomingTvShows, addTrendingTvShows } from "../store/tvshows-category-slice";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetTvShowsBasedOnCategory = () => {

    const dispatch = useDispatch();
    const tvShowsCategory = useSelector((state: any) => (state.tvShowsCategories));

    const popular = useSWR('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', fetcher);
    const upcoming = useSWR('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', fetcher);
    const trending = useSWR('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', fetcher);

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
        if (!trending?.isLoading) {
            dispatch(addTrendingTvShows(trending?.data?.results))
        }
    }, [dispatch, popular?.data?.results, popular?.isLoading, topRated?.data?.results, topRated?.isLoading, trending?.data?.results, trending?.isLoading, upcoming?.data?.results, upcoming?.isLoading]);

    return useMemo(() => ({
        popular: tvShowsCategory?.popular, topRated: tvShowsCategory?.topRated,
        upcoming: tvShowsCategory?.upcoming, trending: tvShowsCategory?.trending
    }), [tvShowsCategory?.popular, tvShowsCategory?.topRated, tvShowsCategory?.trending, tvShowsCategory?.upcoming])

}
