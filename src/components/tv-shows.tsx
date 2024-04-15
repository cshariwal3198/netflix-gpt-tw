import { memo } from "react";
import { useFetchTvShows } from "../hooks/fetch-tv-shows";
import { Card } from "./movie-card";

const TvShows = memo(() => {

    const { isLoading, tvShows } = useFetchTvShows();

    return (
        <div>
            {
                isLoading ? <>Loading</> :
                    tvShows?.map((item) => (
                        <Card key={item.id} item={item} isFavourite={false} canViewSimillar={true} />
                    ))
            }
        </div>
    );
});

export default TvShows;
