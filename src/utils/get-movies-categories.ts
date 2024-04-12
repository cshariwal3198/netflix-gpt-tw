import { useEffect, useState } from "react";
import { IMovie } from "../types";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmUwMjUyZmM5M2E1YzVmM2Q2YmViNjFjZmI3MmUzZiIsInN1YiI6IjYzNTkwZGE2MzE2NDRiMDA3ZjZmYTdlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LMnE6bCAbOCpvNoSUokSh25M9DzNl31IkzLGmdcb6MA'
    }
};

export const getPopularList = async () => {
    return await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
        .then(response => response.json())
        .then(response => (response))
        .catch(err => console.error(err));
}

export const getTopRatedList = async () => {
    return await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', options)
        .then(response => response.json())
        .then(response => (response))
        .catch(err => console.error(err));
}

export const getUpcomingList = async () => {
    return await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', options)
        .then(response => response.json())
        .then(response => (response))
        .catch(err => console.error(err));
}

export const useGetCategoryMovies = () => {
    const [movies, setMovies] = useState<{ popular: IMovie[], topRated: IMovie[], upcoming: IMovie[] }>({} as any);

    useEffect(() => {
        async function getMovies() {
            try {
                const res1 = await getPopularList();
                const res2 = await getTopRatedList();
                const res3 = await getUpcomingList();
                setMovies({ popular: res1.results, topRated: res2.results, upcoming: res3.results })
            } catch (err) {
                console.log(err);
            }
        }
        getMovies();
    }, []);

    return { popular: movies?.popular || [], topRated: movies?.topRated || [], upcoming: movies?.upcoming || [] }
}