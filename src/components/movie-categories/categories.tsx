import React, { memo, useMemo } from "react";
import { Card } from "../card/movie-card";
import { RingLoader } from "react-spinners";
import { useGetFavourites } from "../../hooks/use-get-favourites";
import { IMovie } from "../../types";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory, useTranslator } from "../../hooks";
import { StyledSpan, StyledWrapper } from "./category-styles";

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
