import { useCallback, useMemo, useState } from "react";

export const useFecthMovies = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);

    const options = useMemo(() => ({
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmUwMjUyZmM5M2E1YzVmM2Q2YmViNjFjZmI3MmUzZiIsInN1YiI6IjYzNTkwZGE2MzE2NDRiMDA3ZjZmYTdlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LMnE6bCAbOCpvNoSUokSh25M9DzNl31IkzLGmdcb6MA'
        }
    }
    ), []);

    const getAllMovies = useCallback(async () => {
        setLoading(true)
        try {
            const result = await fetch('https://api.themoviedb.org/3/discover/movie', options).then(response => response.json());
            setLoading(false);
            return result;
        } catch (err) {
            setLoading(false);
            console.log(err);
        }

    }, [options]);

    return { getAllMovies, loading }

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