import { IMovie } from "../../types";

export interface ICardProps {
    item: IMovie, isFavourite: boolean, canViewSimillar: boolean, type?: 'movie' | 'tvshow', canShowDetails?: boolean,
    canShowWishlist?: boolean
}