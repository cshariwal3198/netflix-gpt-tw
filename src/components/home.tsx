import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useFetchMovies } from "../hooks/fetch-movies";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";
import { CoverMovie } from "./cover-movie";
import { useDisplaySizeGroup, useFetchTopRated } from "../hooks";
import { useGetFavourites } from "../hooks/use-get-favourites";

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
    flex-wrap: wrap;
    justify-content: ${({ $isSM }) => ($isSM ? 'center' : 'start')};
    row-gap: 25px;
    column-gap: 12px;
    margin-top: 8px;
`;

const StyledSpan = styled.span`
    font-size: 45px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export default function Home() {

    const { allMovies: data, loading } = useFetchMovies();
    const { loading: topRatedLoad, topRatedMovies } = useFetchTopRated();
    const [allMovies, setAllMovies] = useState<IMovie[]>([]);
    const { favourites } = useGetFavourites();
    const { isSM } = useDisplaySizeGroup();

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
    onSearch; topRatedLoad;

    const getIsFavourite = useCallback((id: number) => (
        favourites?.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    const renderMovies = useCallback(() => allMovies?.slice(1).map((item) => (
        <Card item={item} key={item.id} isFavourite={getIsFavourite(item.id)} canViewSimillar={true} />
    )), [allMovies, getIsFavourite]);

    const renderTopRated = useCallback(() => (
        topRatedMovies?.map((item) => (
            <Card item={item} isFavourite={getIsFavourite(item?.id)} key={item.id} canViewSimillar={true} />
        ))
    ), [getIsFavourite, topRatedMovies]);

    return (
        <div className="font-medium flex flex-col">
            {
                loading ? <ShimmerUI /> :
                    <StyledWrapper>
                        <CoverMovie movieItem={data[0]} />
                        <StyledSpan>All Movies</StyledSpan>
                        <StyledFlexWrap $isSM={isSM}>
                            {
                                renderMovies()
                            }
                        </StyledFlexWrap>
                        <StyledSpan>Top Rated</StyledSpan>
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