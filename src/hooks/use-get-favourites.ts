import { useSelector } from "react-redux";
import { IMovie } from "../types";
import { useCallback } from "react";

export const useGetFavourites = () => {
    const favourites: { movie: IMovie[], tvshow: IMovie[] } = useSelector((state: any) => (state.favourites));

    const getIsFavourite = useCallback((id: number, type: 'movie' | 'tvshow') => (
        favourites[type]?.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    return { favourites, getIsFavourite }
}