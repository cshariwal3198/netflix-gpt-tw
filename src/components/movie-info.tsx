import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieDetails } from "../hooks/get-movie-details";
import { IMovie, IMovieDetails } from "../types";
import styled from "styled-components";
import { useDisplaySizeGroup } from "../hooks";
import { BiStar, BiCalendar } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { StyledSpan } from "../common-styles";
import ReactPlayer from 'react-player';

const StyledBackground = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: -1;
`;

const StyledGrid = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '350px auto')};
    column-gap: 30px;
    width: 100%; padding: 20px;
`;

const StyledInnerGrid = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '0.6fr 1fr')};
    column-gap: 30px;
    row-gap: 20px;
    width: 100%; padding: 20px;
`;

const StyledImage = styled.img`
    height: 50vh;
    min-width: 260px;
    border-radius: 30px;
    box-shadow: 5px 0px 30px white;
    justify-self: center;
`;

const StyledButton = styled.button`
    display: grid;
    grid-template-columns: 20px auto;
    column-gap: 15px;
    min-width: 160px;
    max-width: fit-content; align-items: center;
    padding: 8px; border: 1px solid white;
    font-size: x-large; border-radius: 7px;
`;

const StyledFlex = styled.div`
    display: flex;
    column-gap: 20px;
    justify-content: start;
`;

const MovieInfo = memo(() => {

    const { id } = useParams();
    const { movieDetails } = useFetchMovieDetails(Number(id));
    console.log(movieDetails);

    const { isMD, isSM } = useDisplaySizeGroup();

    const { backdrop_path, poster_path, genres, overview, vote_average, original_title, tagline, release_date, videos } = movieDetails as IMovieDetails & IMovie;

    const renderGenres = useCallback(() => {
        return genres?.map(({ id, name }) => (
            <StyledSpan key={id}>{name}</StyledSpan>
        ))
    }, [genres]);

    const renderTrailerVideo = useCallback(() => {
        const trailerObject = videos?.results?.find(({ name }) => (name.toLowerCase() === 'official trailer'));

        if (trailerObject) {
            const { id, key } = trailerObject;
            return (
                <div>
                    <ReactPlayer key={id} url={`https://www.youtube.com/embed/${key}`} controls />
                </div>
            )
        }
        return null;

    }, [videos?.results]);

    return (
        <div className="flex flex-col items-center size-[100%] relative text-[white]">
            <StyledBackground src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="" />
            <StyledGrid $isSM={isSM}>
                <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
                <StyledInnerGrid $isSM={isSM || isMD}>
                    <div className="flex flex-col gap-y-4 ml-2 sm:justify-center">
                        <h1 className="text-[45px] font-sans">{original_title}</h1>
                        {
                            tagline ? <span className="shadow-[rgb(21, 21, 21) 0px 0px 5px] text-[18px] italic self-center">{tagline}</span> : null
                        }
                        <StyledFlex>
                            <span className="flex gap-2 items-center"><BiStar size="25px" />{vote_average}</span>
                            <span className="flex gap-2 items-center"><BiCalendar size="25px" />{release_date}</span>
                        </StyledFlex>
                        <StyledFlex>
                            <StyledButton><FaHeart />Wishlist</StyledButton>
                            <StyledButton> <FaPlay />Play </StyledButton>
                        </StyledFlex>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-x-5">{renderGenres()}</div>
                        <span className="font-normal">{overview}</span>
                        {renderTrailerVideo()}
                    </div>
                </StyledInnerGrid>
            </StyledGrid>
        </div>
    );
});

export default MovieInfo;