export interface IMovie {
    id: number;
    original_title: string;
    origial_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    backdrop_path: string;
}

export interface IMovieDetails {
    id: number;
    homepage: string;
    status: string;
    tagline: string;
    belongs_to_collection: { id: number, name: string, poster_path: string }
    production_companies: { logo_path: string, name: string }[];
    genres: { id: number, name: string }[];
    videos: {
        results: { id: number; key: string; name: string; }[];
    }
}