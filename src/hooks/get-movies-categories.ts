import useSWR from "swr";
import { options } from "./utils";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetMoviesBasedOnCategory = () => {
    const popular = useSWR('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', fetcher);
    const upcoming = useSWR('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', fetcher);

    return {
        popular, topRated, upcoming
    }
}
