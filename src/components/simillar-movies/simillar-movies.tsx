import { memo } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieOrShowDetails } from "../../hooks/get-movie-details";
import { Card } from "../card/movie-card";
import { useDisplaySizeGroup } from "../../hooks";
import { IMovie } from "../../types";
import { StyledDiv } from "./styles";

const ViewSimillar = memo(() => {

    const { type = 'movie', id } = useParams();
    const { isMD, isSM } = useDisplaySizeGroup();

    const { simillarShowsData } = useFetchMovieOrShowDetails(Number(id), type);

    return (
        <div className="flex flex-col gap-5 justify-start">
            <h1 className="text-[35px] font-semibold pt-4 pl-5">Showing Simillar {type === 'movie' ? 'Movies' : 'Shows'}</h1>
            <StyledDiv $isSM={isMD || isSM}>
                {
                    !simillarShowsData.isLoading ?
                        simillarShowsData?.data?.results?.map((item: IMovie) => (
                            item.backdrop_path && item.poster_path ?
                                <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} /> : null
                        )) :
                        <h1>No simillar {type === 'movie' ? 'Movies' : 'Shows'} Available</h1>
                }
            </StyledDiv>
        </div>
    )
});

export default ViewSimillar;
