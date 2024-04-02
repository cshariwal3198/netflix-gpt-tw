import { useCallback } from "react";
import styled from "styled-components";
import { useFecthMovies } from "../hooks/fetch-movies";
import { Navbar } from "./Navbar";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";
import { CoverMovie } from "./cover-movie";
import { useSelector } from "react-redux";

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
    row-gap: 25px;
    column-gap: 25px;
    margin-top: 15px;
`;

export default function Body() {

    const { data, loading } = useFecthMovies();
    const favourites = useSelector((state: any) => (state.favourites));

    const getIsFavourite = useCallback((id: number) => (
        favourites.some(({ id: movieId }: { id: number }) => (movieId === id))
    ), [favourites]);

    const renderMovies = useCallback(() => (data as IMovie[]).map((item) => (
        <Card item={item} key={item.id} isFavourite={getIsFavourite(item.id)} />
    )), [data, getIsFavourite]);

    return (
        <div className="font-medium flex flex-col">
            <Navbar />
            {
                loading ? <ShimmerUI /> :
                    <StyledWrapper>
                        <CoverMovie movieItem={data[0]} />
                        <StyledFlexWrap>
                            {
                                renderMovies()
                            }
                        </StyledFlexWrap>
                    </StyledWrapper>
            }
        </div>
    )
}