import useSWR from "swr"
import { options } from "./utils"

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useFetchTvShows = () => {

    const tvShows = useSWR('https://api.themoviedb.org/3/trending/tv/day?language=en-US', fetcher);
    const popular = useSWR('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', fetcher);
    const details = useSWR('https://api.themoviedb.org/3/tv/106379?language=en-US', fetcher);

    console.log(details.data);
    return {
        trending: tvShows, popular, topRated
    }

}