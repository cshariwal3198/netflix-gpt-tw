import useSWR from "swr";
import { options } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { addTopRatedMovies, addPopularMovies, addUpcomingMovies, addAllMovies, addNowPlayingMovies } from "../store/movies-category-slice";
import { useEffect, useMemo } from "react";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetMoviesBasedOnCategory = () => {

    const dispatch = useDispatch();
    const moviesCategory = useSelector((state: any) => (state.categories));

    const allMovies = useSWR('https://api.themoviedb.org/3/discover/movie?language=en-US&page=2', fetcher);
    const popular = useSWR('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', fetcher);
    const upcoming = useSWR('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', fetcher);
    const nowPlaying = useSWR('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', fetcher);

    useEffect(() => {
        if (!allMovies?.isLoading) {
            dispatch(addAllMovies(allMovies?.data?.results))
        }
        if (!popular?.isLoading) {
            dispatch(addPopularMovies(popular?.data?.results))
        }
        if (!topRated?.isLoading) {
            dispatch(addTopRatedMovies(topRated?.data?.results))
        }
        if (!upcoming?.isLoading) {
            dispatch(addUpcomingMovies(upcoming?.data?.results))
        }
        if (!nowPlaying?.isLoading) {
            dispatch(addNowPlayingMovies(nowPlaying?.data?.results))
        }
    }, [allMovies?.data?.results, allMovies?.isLoading, dispatch, nowPlaying?.data?.results, nowPlaying?.isLoading, popular?.data?.results, popular?.isLoading, topRated?.data?.results, topRated?.isLoading, upcoming?.data?.results, upcoming?.isLoading]);

    return useMemo(() => ({
        popular: moviesCategory?.popular,
        topRated: moviesCategory?.topRated,
        upcoming: moviesCategory?.upcoming,
        allMovies: moviesCategory?.allMovies,
        nowPlaying: moviesCategory?.nowPlaying
    }), [moviesCategory?.allMovies, moviesCategory?.nowPlaying, moviesCategory?.popular, moviesCategory?.topRated, moviesCategory?.upcoming]);

}
