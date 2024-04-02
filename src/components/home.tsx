import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useFetchMovies } from "../hooks/fetch-movies";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";
import { CoverMovie } from "./cover-movie";
import { useFetchTopRated } from "../hooks";
import { Footer } from "./footer";
import { useGetFavourites } from "../hooks/use-get-favourites";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    row-gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 30px;
`;

const StyledFlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 25px;
    column-gap: 25px;
    margin-top: 15px;
`;

const StyledSpan = styled.span`
    font-size: 45px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
`;

export default function Home() {

    const { allMovies: data, loading } = useFetchMovies();
    const { loading: topRatedLoad, topRatedMovies } = useFetchTopRated();
    const [allMovies, setAllMovies] = useState<IMovie[]>([]);
    const { favourites } = useGetFavourites();

    useEffect(() => {
        if (!loading && data.length) {
            setAllMovies(data);
        }
    }, [data, loading]);

    const onSearch = useCallback((e: any) => {
        setAllMovies((preState) => (
            e.target.value ? [...preState, ...topRatedMovies].filter(({ original_title, title }) => (
                String(original_title).includes(e.target.value) || String(title).includes(e.target.value)
            )) : data
        ))
    }, [data, topRatedMovies]);

    const getIsFavourite = useCallback((id: number) => (
        favourites.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    const renderMovies = useCallback(() => allMovies?.map((item) => (
        <Card item={item} key={item.id} isFavourite={getIsFavourite(item.id)} />
    )), [allMovies, getIsFavourite]);

    const renderTopRated = useCallback(() => (
        topRatedMovies?.map((item) => (
            <Card item={item} isFavourite={false} key={item.id} />
        ))
    ), [topRatedMovies]);

    return (
        <div className="font-medium flex flex-col">
            {
                loading ? <ShimmerUI /> :
                    <StyledWrapper>
                        <CoverMovie movieItem={data[0]} />
                        <StyledSpan>All Movies</StyledSpan>
                        <StyledFlexWrap>
                            {
                                renderMovies()
                            }
                        </StyledFlexWrap>
                        <StyledSpan>Top Rated</StyledSpan>
                        <StyledFlexWrap>
                            {
                                renderTopRated()
                            }
                        </StyledFlexWrap>
                    </StyledWrapper>
            }
            <Footer />
        </div >
    )
}