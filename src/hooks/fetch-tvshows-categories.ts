import useSWR from "swr";
import { options } from "./utils";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addPopularTvShows, addTopRatedTvShows, addUpcomingTvShows, addTrendingTvShows } from "../store/tvshows-category-slice";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useUpdateTvShowsToStoreBasedOnCategory = () => {

    const dispatch = useDispatch();

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

    return null;

}
