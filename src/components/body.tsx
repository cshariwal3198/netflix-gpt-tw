import { useEffect, useState } from "react";
import { useFecthMovies } from "../hooks/fetch-movies";
import { Navbar } from "./Navbar";
import { Loading } from ".";

export default function Body() {

    const { getAllMovies, loading } = useFecthMovies();

    const [movies, setMovies] = useState<any>(null);

    useEffect(() => {
        setMovies(getAllMovies());
    }, [getAllMovies]);

    return (
        <div className="font-medium flex flex-col">
            <Navbar />
            {
                movies ?
                    <>
                        {
                            loading ? <Loading /> : <>Movies screen</>
                        }
                    </> : null
            }
        </div>
    )
}