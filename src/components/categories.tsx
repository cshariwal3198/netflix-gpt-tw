import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { Card } from "./movie-card";
import { RingLoader } from "react-spinners";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { IMovie } from "../types";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory, useTranslator } from "../hooks";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ $isSM, $isMD }) => ($isSM ? '6px' : getValueBasedOnResolution($isMD, '10px', '13px'))};
    row-gap: ${({ $isSM, $isMD }) => ($isSM ? '15px' : getValueBasedOnResolution($isMD, '16px', '20px'))};
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
    const { translate } = useTranslator();

    const moviesToRender: { name: string, moviesData: IMovie[], title: string }[] = useMemo(() => ([
        { name: 'Popular', moviesData: popular, title: 'general.popular' },
        { name: 'Top Rated', moviesData: topRated, title: 'general.topRated' },
        { name: 'UpComing', moviesData: upcoming, title: 'general.upComing' }
    ]), [popular, topRated, upcoming]);

    return (
        <div className="flex flex-col">
            {
                moviesToRender.map(({ moviesData, name, title }) => (
                    <React.Fragment key={name}>
                        <StyledSpan $isSM={isSM} $isMD={isMD}>{translate(title)}</StyledSpan>
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
