import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { Card } from "./movie-card";
import { RingLoader } from "react-spinners";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { IMovie } from "../types";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory } from "../hooks";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ $isSM, $isMD }) => ($isSM ? '8px' : getValueBasedOnResolution($isMD, '12px', '15px'))};
    row-gap: ${({ $isSM, $isMD }) => ($isSM ? '20px' : getValueBasedOnResolution($isMD, '28px', '32px'))};
    margin-bottom: 30px;
`;

const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '45px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-left: 3%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Categories = memo(() => {

    const { getIsFavourite } = useGetFavourites();
    const { popular, topRated, upcoming } = useGetMoviesBasedOnCategory();
    const { isMD, isSM } = useDisplaySizeGroup();

    const moviesToRender: { name: string, moviesData: IMovie[] }[] = useMemo(() => ([
        { name: 'Popular', moviesData: popular }, { name: 'Top Rated', moviesData: topRated }, { name: 'UpComing', moviesData: upcoming }
    ]), [popular, topRated, upcoming]);

    return (
        <div className="flex flex-col">
            {
                moviesToRender.map(({ moviesData, name }) => (
                    <React.Fragment key={name}>
                        <StyledSpan $isSM={isSM} $isMD={isMD}>{name}</StyledSpan>
                        <StyledWrapper $isSM={isSM} $isMD={isMD}>
                            {
                                !moviesData?.length ?
                                    <div className="flex h-[100%] w-full justify-center items-center">
                                        <RingLoader color="#36d7b7" />
                                    </div> :
                                    moviesData.map((item: IMovie) => (
                                        <Card item={item} canViewSimillar={true} isFavourite={getIsFavourite(item.id, 'movie')} key={item.id} type="movie" />
                                    ))
                            }
                        </StyledWrapper>
                    </React.Fragment>
                ))
            }
        </div>
    )
});

export default Categories;
