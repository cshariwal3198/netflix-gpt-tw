import React, { useCallback, useMemo } from "react";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory, useTranslator } from "../../hooks";
import { useGetFavourites } from "../../hooks/use-get-favourites";
import { IMovie } from "../../types";
import { CoverMovie } from "../cover-movie/cover-movie";
import { Card } from "../card/movie-card";
import { ShimmerUI } from "../shimmer";
import { StyledFlexWrap, StyledSpan, StyledWrapper } from "./home-styles";

export default function Home() {

    const { allMovies, topRated, nowPlaying, upcoming } = useGetMoviesBasedOnCategory();
    const { getIsFavourite } = useGetFavourites();
    const { isSM, isMD } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const recommended = ([...topRated, ...nowPlaying, ...upcoming] as IMovie[]).filter(({ vote_average }) => vote_average > 8).reverse();

    const moviesData = useMemo(() => (
        [
            { movieList: recommended, name: 'Recommended', title: 'general.recommended' },
            { movieList: topRated, name: 'Top Rated', title: 'general.topRated' },
            { movieList: nowPlaying, name: 'Now Playing', title: 'general.nowPlaying' },
            { movieList: upcoming, name: 'Up Coming', title: 'general.upComing' }
        ]
    ), [nowPlaying, recommended, topRated, upcoming]);

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
                                <React.Fragment key={name}>
                                    <StyledSpan $isSM={isSM} $isMD={isMD}>{translate(title)}</StyledSpan>
                                    <StyledFlexWrap key={name}>
                                        {
                                            movieList?.map((item: IMovie) => (
                                                <Card item={item} isFavourite={getIsFavourite(item?.id, 'movie')} key={item.id} canViewSimillar={true} />
                                            ))
                                        }
                                    </StyledFlexWrap>
                                </React.Fragment>
                            ))
                        }
                    </StyledWrapper>
            }
        </div >
    )
}