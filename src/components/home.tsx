import { useCallback } from "react";
import styled from "styled-components";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";
import { CoverMovie } from "./cover-movie";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory } from "../hooks";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    row-gap: 20px;
    width: 100%;
    justify-content: start;
    padding: 10px;
`;

const StyledFlexWrap = styled.div<{ $isSM: boolean }>`
    display: flex;
    column-gap: 12px;
    overflow: auto;
    padding-top: 10px;
    padding-bottom: 15px;
    overflow-y: hidden;
    min-height: 255px;
`;

const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '45px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
`;

export default function Home() {

    const { allMovies, topRated, nowPlaying } = useGetMoviesBasedOnCategory();
    const { getIsFavourite } = useGetFavourites();
    const { isSM, isMD } = useDisplaySizeGroup();

    const renderMovies = useCallback(() => allMovies?.slice(1).map((item: IMovie) => (
        <Card item={item} key={item.id} isFavourite={getIsFavourite(item.id, 'movie')} canViewSimillar={true} />
    )), [allMovies, getIsFavourite]);

    const renderTopRated = useCallback(() => (
        topRated?.map((item: IMovie) => (
            <Card item={item} isFavourite={getIsFavourite(item?.id, 'movie')} key={item.id} canViewSimillar={true} />
        ))
    ), [getIsFavourite, topRated]);

    const renderNowPlaying = useCallback(() => (
        nowPlaying?.map((item: IMovie) => (
            <Card item={item} isFavourite={getIsFavourite(item?.id, 'movie')} key={item.id} canViewSimillar={true} />
        ))
    ), [getIsFavourite, nowPlaying]);

    return (
        <div className="font-medium flex flex-col">
            {
                !allMovies.length ? <ShimmerUI /> :
                    <StyledWrapper>
                        <CoverMovie movieItem={allMovies[0]} />
                        <StyledSpan $isSM={isSM} $isMD={isMD}>Now Playing</StyledSpan>
                        <StyledFlexWrap $isSM={isSM}>
                            {
                                renderNowPlaying()
                            }
                        </StyledFlexWrap>
                        <StyledSpan $isSM={isSM} $isMD={isMD}>Popular</StyledSpan>
                        <StyledFlexWrap $isSM={isSM}>
                            {
                                renderMovies()
                            }
                        </StyledFlexWrap>
                        <StyledSpan $isSM={isSM} $isMD={isMD}>Top Rated</StyledSpan>
                        <StyledFlexWrap $isSM={isSM}>
                            {
                                renderTopRated()
                            }
                        </StyledFlexWrap>
                    </StyledWrapper>
            }
        </div >
    )
}