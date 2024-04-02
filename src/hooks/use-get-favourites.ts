import { useSelector } from "react-redux";
import { IMovie } from "../types";

export const useGetFavourites = () => {
    const favourites: IMovie[] = useSelector((state: any) => (state.favourites));

    return { favourites }
}