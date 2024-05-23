import { useEffect, useState } from "react";
import { options } from "./utils";
import useSWR from "swr";
import { IMovieDetails, ITvShowDeatils } from "../types";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useFetchMovieOrShowDetails = (id: number, type: 'movie' | 'tvshow') => {

    const [movieDetails, setMovieDetails] = useState<IMovieDetails | ITvShowDeatils>({} as IMovieDetails | ITvShowDeatils);

    const simillarShowsData = useSWR(`https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/${id}/similar?language=en-US&page=1`, fetcher);

    useEffect(() => {
        async function getMovies() {
            await fetch(`https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
                .then((res => res.json())).then(data => (setMovieDetails(data)));
        }
        getMovies();
    }, [id, type]);

    return { showDetails: movieDetails, simillarShowsData };

}
