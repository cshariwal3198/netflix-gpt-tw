import { useEffect, useState } from "react";
import { options } from "./utils";
import useSWR from "swr";
import { IMovieDetails } from "../types";

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useFetchMovieDetails = (id: number) => {

    const [movieDetails, setMovieDeatils] = useState<IMovieDetails>({} as IMovieDetails);

    const simillarMoviesData = useSWR(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`, fetcher);

    useEffect(() => {
        async function getMovies() {
            await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`)
                .then((res => res.json())).then(data => (setMovieDeatils(data)));
        }
        getMovies();
    }, [id]);

    return { movieDetails, simillarMoviesData };

}