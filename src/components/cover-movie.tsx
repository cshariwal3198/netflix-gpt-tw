import { memo } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { useDisplaySizeGroup } from "../hooks";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 8px;
`;

const StyledImage = styled.img`
    border-radius: 10px;
    height: 65vh;
    filter: contrast(0.9);
`;

const StyledPoster = styled.img`
    height: 40vh;
    position: absolute;
    z-index: 2;
    bottom: -30px;
    right: 60px;
    border-radius: 20px;
    box-shadow: 10px 12px 10px 0px black;
`;

const StyledSpan = styled.span`
    position: absolute;
    padding: 20px;
    top: 20px;
    left: 30px;
    font-weight: 600;
    font-size: x-large;
    font-family: serif;
    font-style: italic;
`;

const TitleWrapper = styled(StyledSpan) <{ $isMD: boolean, $isSM: boolean }>`
    font-weight: ${({ $isMD, $isSM }) => ($isMD ? '600' : $isSM ? '500' : '700')};
    font-size: ${({ $isMD, $isSM }) => ($isMD ? '3rem' : $isSM ? '2rem' : '4rem')};
    font-style: normal;
    top: unset; left: unset;
    z-index: 2;
`;

const ReleaseDateWrapper = styled(StyledSpan)`
    left: unset;
    top: 30px;
    right: 30px;
`;

const StyledPara = styled(StyledSpan) <{ $isMD: boolean, $isSM: boolean }>`
    top: unset;
    left: unset;
    bottom: 20px;
    font-weight: 500;
    font-size: ${({ $isMD, $isSM }) => ($isMD ? '25px' : $isSM ? '20px' : '35px')};
    text-align: right;
    z-index: 3;
`;

export const CoverMovie = memo((props: { movieItem: IMovie }) => {

    const { backdrop_path, original_title, overview, release_date, poster_path } = props.movieItem;

    const { isMD, isSM } = useDisplaySizeGroup();

    return (
        <StyledWrapper>
            <TitleWrapper $isMD={isMD} $isSM={isSM}>{original_title}</TitleWrapper>
            <StyledImage src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} />
            <StyledPoster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
            {
                (isMD || isSM) ? null : <ReleaseDateWrapper>{release_date}</ReleaseDateWrapper>
            }
            <StyledPara $isMD={isMD} $isSM={isSM}>{overview}</StyledPara>
        </StyledWrapper>
    );

})