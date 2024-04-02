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

// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmUwMjUyZmM5M2E1YzVmM2Q2YmViNjFjZmI3MmUzZiIsInN1YiI6IjYzNTkwZGE2MzE2NDRiMDA3ZjZmYTdlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LMnE6bCAbOCpvNoSUokSh25M9DzNl31IkzLGmdcb6MA'
//     }
// };

// fetch('https://api.themoviedb.org/3/account/15349758/rated/movies?language=en-US&page=1&sort_by=created_at.asc', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));