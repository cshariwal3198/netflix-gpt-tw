import useSWR from "swr"
import { options } from "./utils"

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetCreditsDetails = (type: string, id: string) => {

    const { data, isLoading } = useSWR(`https://api.themoviedb.org/3/${type === 'tvshow' ? 'tv' : type}/${id}/credits?language=en-US`, fetcher);

    return {
        credits: data, isLoading
    }

}
