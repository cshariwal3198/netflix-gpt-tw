import { useCallback } from "react";
import styled from "styled-components";
import { useFecthMovies } from "../hooks/fetch-movies";
import { Navbar } from "./Navbar";
import { ShimmerUI } from "./shimmer";
import { IMovie } from "../types";
import { Card } from "./movie-card";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const StyledFlexWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 25px;
    column-gap: 25px;
`;

const StyledText = styled.h3`
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: x-large;
    font-weight: 600;
    margin-bottom: 20px;
`;

export default function Body() {

    const { data, loading } = useFecthMovies();

    const addToFavourite = () => ('');

    const removeFromFavourite = () => ('');

    const renderMovies = useCallback(() => (data as IMovie[]).map((item) => (<Card {...item} key={item.id} addToFavourite={addToFavourite} removeFromFavourite={removeFromFavourite} />)), [data]);

    return (
        <div className="font-medium flex flex-col">
            <Navbar />
            {
                loading ? <ShimmerUI /> :
                    <StyledWrapper>
                        <StyledText>All Movies</StyledText>
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