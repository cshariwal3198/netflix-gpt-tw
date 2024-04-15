import { memo, useCallback, useMemo } from "react";
import { useGetMoviesBasedOnCategory } from "../utils";
import styled from "styled-components";
import { Card } from "./movie-card";
import { RingLoader } from "react-spinners";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { IMovie } from "../types";

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
`;

const StyledSpan = styled.span`
    font-size: 45px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Categories = memo(() => {

    const { favourites } = useGetFavourites();
    const { popular, topRated, upcoming } = useGetMoviesBasedOnCategory();

    const moviesToRender = useMemo(() => ([
        { name: 'Popular', moviesData: popular }, { name: 'Top Rated', moviesData: topRated }, { name: 'UpComing', moviesData: upcoming }
    ]), [popular, topRated, upcoming]);

    const getIsFavourite = useCallback((id: number) => (
        favourites?.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    return (
        <div className="flex flex-col h-full">
            {
                moviesToRender.map(({ moviesData, name }) => (
                    <>
                        <StyledSpan>{name}</StyledSpan>
                        <StyledWrapper>
                            {
                                moviesData.isLoading ?
                                    <div className="flex h-[100%] w-full justify-center items-center">
                                        <RingLoader color="#36d7b7" />
                                    </div> :
                                    moviesData.data.results?.map((item: IMovie) => (
                                        <Card item={item} canViewSimillar={true} isFavourite={getIsFavourite(item.id)} key={item.id} />
                                    ))
                            }
                        </StyledWrapper>
                    </>
                ))
            }
        </div>
    )
});

export default Categories;
