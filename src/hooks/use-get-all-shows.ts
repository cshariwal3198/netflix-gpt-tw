import { useMemo } from "react";
import { useStoreSelectors } from "../store";
import { IMovie } from "../types";

type IAllShow = IMovie & { showType: string };

export const useGetAllShows = () => {

    const { selectMoviesBasedOnCategory, selectTvShowsBasedOnCategory } = useStoreSelectors();

    const { topRated: topRatedMovies, popular: popularMovies, upcoming: upComingMovies, nowPlaying: nowPlayingMovies } = selectMoviesBasedOnCategory;
    const { popular: popularShows, topRated: topRatedShows, trending: trendingShows, upcoming: upcomingShows } = selectTvShowsBasedOnCategory;

    const allShows: IAllShow[] = useMemo(() => {

        const filteredMovies: IAllShow[] = [];
        const filteredTvShows: IAllShow[] = [];

        [...topRatedMovies, ...popularMovies, ...upComingMovies, ...nowPlayingMovies].forEach((item) => {
            if (!filteredMovies.find(({ id: movieId }) => (movieId === item.id))) {
                filteredMovies.push({ ...item, showType: 'movie' });
            }
        });

        [...popularShows, ...topRatedShows, ...trendingShows, ...upcomingShows].forEach((item) => {
            if (!filteredTvShows.find(({ id }) => (id === item.id))) {
                filteredTvShows.push({ ...item, showType: 'tvshow' });
            }
        });

        return [...filteredMovies, ...filteredTvShows]
    }, [popularMovies, popularShows, topRatedMovies, topRatedShows, trendingShows, upComingMovies, upcomingShows, nowPlayingMovies]);

    return { allShows }
}