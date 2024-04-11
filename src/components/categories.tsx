import { memo } from "react";
import { useGetCategoryMovies } from "../utils";
import styled from "styled-components";
import { Card } from "./movie-card";

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

    const moviesToRender = [
        { name: 'Popular', movies: popular }, { name: 'Top Rated', movies: topRated }, { name: 'UpComing', movies: upcoming }
    ];

    return (
        <div>
            {
                moviesToRender.map(({ movies, name }) => (
                    <>
                        <StyledSpan>{name}</StyledSpan>
                        <StyledWrapper>
                            {movies?.map((item) => (
                                <Card item={item} canViewSimillar={false} isFavourite={false} key={item.id} />
                            ))}
                        </StyledWrapper>
                    </>
                ))
            }
        </div>
    )
});

export default Categories;
