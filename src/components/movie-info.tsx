import { memo, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieDetails } from "../hooks/get-movie-details";
import { IMovie, IMovieDetails } from "../types";
import styled from "styled-components";
import { useDisplaySizeGroup } from "../hooks";
import { BiStar, BiCalendar } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { StyledSpan } from "../common-styles";
import { Card } from "./movie-card";
import { PlayTrailer } from "./play-trialer";

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

const StyledSimillarDiv = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: nowrap;
    column-gap: 20px;
    overflow-x: scroll;
    padding-top: 35px;
    padding-bottom: 35px;
    margin-bottom: 20px;
    padding-left: 20px;
    overflow-y: hidden;
`;

const MovieInfo = memo(() => {

    const { id } = useParams();
    const { movieDetails, simillarMoviesData } = useFetchMovieDetails(Number(id));

    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { isMD, isSM } = useDisplaySizeGroup();

    const { backdrop_path, poster_path, genres, overview, vote_average, original_title, tagline, release_date, videos } = movieDetails?.data?.result as IMovieDetails & IMovie;

    const renderGenres = useCallback(() => {
        return genres?.map(({ id, name }) => (
            <StyledSpan key={id}>{name}</StyledSpan>
        ))
    }, [genres]);

    const onPlayClick = useCallback(() => (setPlayVideo(true)), []);

    const onPlayClose = useCallback(() => (setPlayVideo(false)), []);

    return (
        <div className="flex flex-col items-center size-[100%] relative text-[white] overflow-auto">
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
                            <StyledButton onClick={onPlayClick}> <FaPlay />Play </StyledButton>
                        </StyledFlex>
                    </div>
                    <div className="flex flex-col gap-5 justify-center">
                        <div className="flex gap-5 flex-wrap">{renderGenres()}</div>
                        <span className="font-light text-xl">{overview}</span>
                    </div>
                </StyledInnerGrid>
            </StyledGrid>
            <div className="flex flex-col gap-4 justify-start p-3 relative w-full">
                <h1 className="font-bold font-sans text-[40px]">Simillar Movies</h1>
                <StyledSimillarDiv $isSM={isMD || isSM}>
                    {
                        !simillarMoviesData.isLoading && simillarMoviesData?.data?.results.length ?
                            simillarMoviesData?.data?.results.map((item: IMovie) => (
                                item.backdrop_path && item.poster_path ?
                                    <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} /> : null
                            )) :
                            <h1>No simillar movies Available</h1>
                    }
                </StyledSimillarDiv>
            </div>
            {
                playVideo ? <PlayTrailer videos={videos} onClick={onPlayClose} /> : null
            }
        </div>
    );
});

export default MovieInfo;