import { memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useFetchMovieDetails } from "../hooks/get-movie-details";
import { Card } from "./movie-card";
import { useDisplaySizeGroup } from "../hooks";

const StyledDiv = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ $isSM }) => ($isSM ? 'center' : 'start')};
    column-gap: 20px;
    row-gap: 30px;
`;

const ViewSimillar = memo(() => {

    const { id } = useParams();
    const { isMD, isSM } = useDisplaySizeGroup();

    const { simillarMovies } = useFetchMovieDetails(Number(id));

    return (
        <div className="flex flex-col gap-5 justify-start">
            <h1>Simillar Movies</h1>
            <StyledDiv $isSM={isMD || isSM}>
                {
                    simillarMovies.length ?
                        simillarMovies.map((item) => <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} />) :
                        <h1>No simillar movies Available</h1>
                }
            </StyledDiv>
        </div>
    )
});

export default ViewSimillar;
