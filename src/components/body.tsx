import { useFecthMovies } from "../hooks/fetch-movies";
import { Navbar } from "./Navbar";
// import { ShimmerUI } from "./shimmer";
import { Loading } from ".";

export default function Body() {

    const { data, loading } = useFecthMovies();

    return (
        <div className="font-medium flex flex-col">
            <Navbar />
            {
                loading ? <Loading /> : <>movie screen</>
            }
        </div>
    )
}