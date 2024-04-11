import { useEffect, useState } from "react"
import { options } from "./utils";
import { IMovie } from "../types";

interface IMovieDetails {
    id: number;
    homepage: string;
    status: string;
    belongs_to_collection: { id: number, name: string, poster_path: string }
    production_companies: { logo_path: string, name: string }[];
    genres: { id: number, name: string }[];
    videos: {
        results: { id: number; key: string; name: string; }[];
    }
}

export const useFetchMovieDetails = (id: number) => {

    const [movieDetails, setMoviedetails] = useState<IMovieDetails>({} as IMovieDetails);
    const [simillarMovies, setSimillarMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        async function getMovieDeatils() {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`).then((res) => (res.json()));
                const result = await res;
                setMoviedetails(result)
            } catch (err) {
                if (err) {
                    console.log(err);
                }
            }
        }
        getMovieDeatils();
    }, [id]);

    useEffect(() => {
        async function getSimillarMovies(movieId: number) {
            return await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => setSimillarMovies(response?.results))
                .catch(err => console.error(err));
        }
        getSimillarMovies(id);
    }, [id]);

    return { movieDetails, simillarMovies }

}