import { memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchMovieOrShowDetails } from "../hooks/get-movie-details";
import { Card } from "./movie-card";
import { useDisplaySizeGroup } from "../hooks";
import { IMovie } from "../types";

const StyledDiv = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ $isSM }) => ($isSM ? 'center' : 'start')};
    column-gap: 20px;
    row-gap: 30px;
    width: 100%; height: 100%;
    align-items: center;
`;

const ViewSimillar = memo(() => {

    const { title, id } = useParams();
    const { isMD, isSM } = useDisplaySizeGroup();

    const { simillarShowsData } = useFetchMovieOrShowDetails(Number(id));

    return (
        <div className="flex flex-col gap-5 justify-start">
            <h1 className="text-[35px] font-semibold pt-4 pl-5">Showing Simillar Movies for {title}</h1>
            <StyledDiv $isSM={isMD || isSM}>
                {
                    !simillarShowsData.isLoading ?
                        simillarShowsData?.data?.results?.map((item: IMovie) => (
                            item.backdrop_path && item.poster_path ?
                                <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} /> : null
                        )) :
                        <h1>No simillar movies Available</h1>
                }
            </StyledDiv>
        </div>
    )
});

export default ViewSimillar;
