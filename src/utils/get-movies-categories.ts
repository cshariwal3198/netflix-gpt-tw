import useSWR from "swr";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmUwMjUyZmM5M2E1YzVmM2Q2YmViNjFjZmI3MmUzZiIsInN1YiI6IjYzNTkwZGE2MzE2NDRiMDA3ZjZmYTdlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LMnE6bCAbOCpvNoSUokSh25M9DzNl31IkzLGmdcb6MA'
    }
};

const fetcher = (url: string) => (fetch(url, options).then((res) => (res.json())));

export const useGetMoviesBasedOnCategory = () => {
    const popular = useSWR('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', fetcher);
    const topRated = useSWR('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2', fetcher);
    const upcoming = useSWR('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', fetcher);

    return {
        popular, topRated, upcoming
    }
}
