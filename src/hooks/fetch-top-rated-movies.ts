import { useEffect, useState } from "react";
import { IMovie } from "../types";
import { options } from "./utils";

export const useFetchTopRated = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [topRatedMovies, setTopRatedMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        async function getAllMovies() {
            setLoading(true)
            try {
                await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options).then((res) => (res.json())).then((result) => (
                    setTopRatedMovies(result.results)
                ));
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        getAllMovies();
    }, [topRatedMovies])

    return { loading, topRatedMovies }

}
