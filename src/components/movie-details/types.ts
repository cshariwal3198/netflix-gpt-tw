import { IMovie } from "../../types";

export interface IMovieDetailProps {
    movieItem: IMovie, isFavourite: boolean, setShowInfo: (arg: boolean) => void, canViewSimillar: boolean, type?: 'movie' | 'tvshow'
}