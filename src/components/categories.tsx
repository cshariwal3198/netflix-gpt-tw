import { memo, useCallback } from "react";
import { useGetCategoryMovies } from "../utils";
import styled from "styled-components";
import { Card } from "./movie-card";
import { RingLoader } from "react-spinners";
import { useGetFavourites } from "../hooks/use-get-favourites";

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

    const { popular, topRated, upcoming } = useGetCategoryMovies();
    const { favourites } = useGetFavourites();

    const moviesToRender = [
        { name: 'Popular', movies: popular }, { name: 'Top Rated', movies: topRated }, { name: 'UpComing', movies: upcoming }
    ];

    const getIsFavourite = useCallback((id: number) => (
        favourites?.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    return (
        <div className="flex flex-col h-full">
            {
                popular.length || topRated.length || upcoming.length ?
                    moviesToRender.map(({ movies, name }) => (
                        <>
                            <StyledSpan>{name}</StyledSpan>
                            <StyledWrapper>
                                {
                                    movies?.map((item) => (
                                        <Card item={item} canViewSimillar={false} isFavourite={getIsFavourite(item.id)} key={item.id} />
                                    ))
                                }
                            </StyledWrapper>
                        </>
                    )) :
                    <div className="flex h-[100%] w-full justify-center items-center">
                        <RingLoader color="#36d7b7" />
                    </div>
            }
        </div>
    )
});

export default Categories;
