import { memo, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieOrShowDetails } from "../hooks/get-movie-details";
import { IMovie, ITvShowDeatils } from "../types";
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
    mask-image: linear-gradient(180deg, #0e0d0d 20%, #0000 100%);
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
    padding: 8px; border: 1px solid;
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
    max-height: 300px;
`;

const StyledVideoItem = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: 1fr 40px;
    justify-content: space-around;
    width: 100%;
    padding: 12px;
    border: 1px solid;
    border-radius: 6px;
    margin-left: ${({ $isSM }) => ($isSM ? 0 : '10px')};
`;

const VideosWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 40px;
    padding: 20px;
`;

const MovieInfo = memo(() => {

    const { type = 'movie', id } = useParams();
    const { showDetails, simillarShowsData } = useFetchMovieOrShowDetails(Number(id), type as 'movie' | 'tvshow');
    const [keyToPlay, setKeyToPlay] = useState<string>('');

    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { isMD, isSM } = useDisplaySizeGroup();

    const { backdrop_path, poster_path, genres, overview, vote_average, original_title, tagline, release_date, videos, name } = showDetails as ITvShowDeatils;

    const renderGenres = useCallback(() => {
        return genres?.map(({ id, name }) => (
            <StyledSpan key={id} className="text-black dark:text-white">{name}</StyledSpan>
        ))
    }, [genres]);

    const onPlayClick = useCallback(() => {
        const trailerObject = videos?.results?.find(({ name }) => (name.toLowerCase() === 'official trailer')) || videos?.results.slice(0, 1)[0];
        setKeyToPlay(trailerObject.key);
        setPlayVideo(true);
    }, [videos?.results]);

    const onPlayClose = useCallback(() => {
        setKeyToPlay('');
        setPlayVideo(false);
    }, []);

    const onPlayVideo = useCallback((key: string) => {
        setKeyToPlay(key);
        setPlayVideo(true);
    }, []);

    return (
        <div className="flex flex-col items-center size-[100%] relative overflow-auto">
            <StyledBackground src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt="" />
            <div className="flex flex-col gap-4 justify-center">
                <StyledGrid $isSM={isSM}>
                    <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
                    <StyledInnerGrid $isSM={isSM || isMD}>
                        <div className="flex flex-col gap-y-4 ml-2 sm:justify-center">
                            <h1 className="text-[45px] font-sans">{original_title || name}</h1>
                            {
                                tagline ? <span className="shadow-[rgb(21, 21, 21) 0px 0px 5px] text-[18px] italic self-center text-black dark:text-white">{tagline}</span> : null
                            }
                            <StyledFlex>
                                <span className="flex gap-2 items-center text-black dark:text-white"><BiStar size="25px" />{vote_average}</span>
                                <span className="flex gap-2 items-center text-black dark:text-white"><BiCalendar size="25px" />{release_date}</span>
                            </StyledFlex>
                            <StyledFlex>
                                <StyledButton><FaHeart />Wishlist</StyledButton>
                                <StyledButton onClick={onPlayClick}> <FaPlay />Play </StyledButton>
                            </StyledFlex>
                        </div>
                        <div className="flex flex-col gap-5 justify-center">
                            <div className="flex gap-5 flex-wrap">{renderGenres()}</div>
                            <span className="font-light text-xl text-black dark:text-white">{overview}</span>
                        </div>
                    </StyledInnerGrid>
                </StyledGrid>
                <div className="flex flex-col gap-3 justify-center font-sans p-5">
                    <span className="text-3xl text-black dark:text-white">Related Videos</span>
                    {
                        videos?.results?.length ?
                            <VideosWrapper>
                                {
                                    videos?.results?.map(({ name, key }) => (
                                        <StyledVideoItem key={key} $isSM={isSM}>
                                            <span className="text-lg text-black dark:text-white">{name}</span>
                                            <button className="flex justify-center text-lg cursor-pointer text-red-500" onClick={() => onPlayVideo(key)}>Play</button>
                                        </StyledVideoItem>
                                    ))
                                }
                            </VideosWrapper> : <span className="text-xl">No Videos Found</span>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-start p-3 relative w-full">
                <h1 className="font-bold font-sans text-[40px]">Simillar {type === 'Movie' ? 'Movies' : 'Shows'}</h1>
                <StyledSimillarDiv $isSM={isMD || isSM}>
                    {
                        !simillarShowsData.isLoading && simillarShowsData?.data?.results?.length ?
                            simillarShowsData?.data?.results.map((item: IMovie) => (
                                item.backdrop_path && item.poster_path ?
                                    <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} /> : null
                            )) :
                            <h1>No simillar movies/shows Available</h1>
                    }
                </StyledSimillarDiv>
            </div>
            {
                playVideo ? <PlayTrailer keyToPlay={keyToPlay} onClick={onPlayClose} /> : null
            }
        </div>
    );
});

export default MovieInfo;