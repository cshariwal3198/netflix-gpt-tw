import useSWR from "swr"
import { options } from "./utils"

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useFetchTvShows = () => {

    const { data, isLoading } = useSWR('https://api.themoviedb.org/3/trending/tv/day?language=en-US', fetcher);

    return {
        tvShows: data?.results, isLoading
    }

}