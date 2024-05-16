import { useCallback, useMemo } from "react";
import styled from "styled-components";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";
import { CoverMovie } from "./cover-movie";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory, useTranslator } from "../hooks";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
    justify-content: start;
    padding: 10px;
`;

const StyledFlexWrap = styled.div`
    display: flex;
    overflow: auto;
    padding-top: 4px;
    padding-bottom: 6px;
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

    const { allMovies, topRated, nowPlaying, upcoming } = useGetMoviesBasedOnCategory();
    const { getIsFavourite } = useGetFavourites();
    const { isSM, isMD } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const moviesData = useMemo(() => (
        [
            { movieList: topRated, name: 'Top Rated', title: 'general.topRated' },
            { movieList: nowPlaying, name: 'Now Playing', title: 'general.nowPlaying' },
            { movieList: upcoming, name: 'Up Coming', title: 'general.upComing' }
        ]
    ), [nowPlaying, topRated, upcoming]);

    const renderMovies = useCallback(() => (
        <StyledFlexWrap>
            {
                allMovies?.slice(1).map((item: IMovie) => (
                    <Card item={item} key={item.id} isFavourite={getIsFavourite(item.id, 'movie')} canViewSimillar={true} />
                ))
            }
        </StyledFlexWrap>
    ), [allMovies, getIsFavourite]);

    return (
        <div className="font-medium flex flex-col">
            {
                !allMovies?.length ? <ShimmerUI /> :
                    <StyledWrapper>
                        <CoverMovie movieItem={allMovies[0]} />
                        <StyledSpan $isSM={isSM} $isMD={isMD}>{translate('general.popular')}</StyledSpan>
                        {renderMovies()}
                        {
                            moviesData.map(({ movieList, name, title }) => (
                                <>
                                    <StyledSpan $isSM={isSM} $isMD={isMD}>{translate(title)}</StyledSpan>
                                    <StyledFlexWrap key={name}>
                                        {
                                            movieList?.map((item: IMovie) => (
                                                <Card item={item} isFavourite={getIsFavourite(item?.id, 'movie')} key={item.id} canViewSimillar={true} />
                                            ))
                                        }
                                    </StyledFlexWrap>
                                </>
                            ))
                        }
                    </StyledWrapper>
            }
        </div >
    )
}