import useSWR from "swr"
import { options } from "./utils"
import { useEffect, useState } from "react";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

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