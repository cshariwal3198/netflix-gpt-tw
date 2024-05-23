import { useCallback } from "react";
import { useStoreSelectors } from "../store";

export const useGetFavourites = () => {
    const { selectFavourites } = useStoreSelectors();

    const favourites = selectFavourites;

    const getIsFavourite = useCallback((id: number, type: 'movie' | 'tvshow') => (
        favourites[type]?.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    return { favourites, getIsFavourite }
}