import { useEffect, useState } from "react";
import { IMovie } from "../types";
import { options } from "./utils";

export const useFetchMovies = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [allMovies, setAllMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        async function getAllMovies() {
            setLoading(true)
            try {
                await fetch('https://api.themoviedb.org/3/discover/movie', options).then((res) => (res.json())).then((result) => (
                    setAllMovies(result.results)
                ));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        getAllMovies();
    }, [])

    return { allMovies, loading }

}
