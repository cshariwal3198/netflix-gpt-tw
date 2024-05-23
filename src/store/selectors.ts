import { useSelector } from 'react-redux';
import { RootState } from './store';
import { IMovie } from '../types';

export const useStoreSelectors = () => {
    const selectMoviesBasedOnCategory = useSelector((state: RootState) => (state.categories));

    const selectRecentlyOpenedShows = useSelector((state: RootState) => (state.recentlyOpened));

    const selectTvShowsBasedOnCategory = useSelector((state: RootState) => (state.tvShowsCategories));

    const selectFavourites: { movie: IMovie[], tvshow: IMovie[] } = useSelector((state: RootState) => (state.favourites));

    return {
        selectMoviesBasedOnCategory, selectRecentlyOpenedShows, selectTvShowsBasedOnCategory, selectFavourites
    };

};
