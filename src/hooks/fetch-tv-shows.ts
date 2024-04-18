import useSWR from "swr"
import { options } from "./utils"
import { useEffect, useState } from "react";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useFetchTvShows = () => {

    const tvShows = useSWR('https://api.themoviedb.org/3/trending/tv/day?language=en-US', fetcher);
    const popular = useSWR('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', fetcher);

    return {
        trending: tvShows, popular, topRated
    }

}

export const useFecthTvShowDeatilsBasedOnId = (id: string) => {

    const [showDeatils, setShowDeatils] = useState({});

    useEffect(() => {
        async function getShowDeatils() {
            const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
            const response = await res.json();
            setShowDeatils(response);
        }
        getShowDeatils();
    }, [id]);

    const simillarShows = useSWR(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`, fetcher);

    return {
        movideDetails: showDeatils, simillarShows
    };
}