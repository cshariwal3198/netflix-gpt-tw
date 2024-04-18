import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { useDisplaySizeGroup } from "../hooks";
import { Link } from "react-router-dom";
import { PlayTrailer } from "./play-trialer";
import { useFetchMovieDetails } from "../hooks/get-movie-details";

const getValueBasedOnResolution = ($isSM: boolean, val1: string, val2: string) => ($isSM ? val1 : val2);

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    text-align: center;
    margin-top: 8px;
    border: 1px solid white;
    border-radius: 10px;
`;

const StyledImage = styled.img<{ $isSM: boolean, $isMD: boolean }>`
    border-radius: 10px;
    height: ${({ $isSM, $isMD }) => ($isSM ? '50vh' : $isMD ? '60vh' : '75vh')};
    filter: blur(2px);
    z-index: -1;
    width: 100%;
    opacity: 0.7;
    mask-image: linear-gradient(180deg, #c7c4c4 80%, #0000 100%);
    aspect-ratio: calc(8);
    background: linear-gradient();
`;

const StyledPoster = styled.img<{ $isSM: boolean, $isMD: boolean }>`
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '20vh' : $isMD ? '30vh' : '40vh')};
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

const TitleWrapper = styled.p <{ $isMD: boolean, $isSM: boolean }>`
    font-weight: ${({ $isMD, $isSM }) => ($isMD ? '600' : getValueBasedOnResolution($isSM, '500', '700'))};
    font-size: ${({ $isMD, $isSM }) => ($isMD ? '2rem' : getValueBasedOnResolution($isSM, '1.5rem', '3rem'))};
    z-index: 2;
    font-family: serif;
`;

const ReleaseDateWrapper = styled(StyledSpan)`
    left: unset;
    top: 30px;
    right: 30px;
`;

const StyledPara = styled.p <{ $isMD: boolean, $isSM: boolean }>`
    font-family: serif;
    font-weight: 300;
    font-size: ${({ $isMD, $isSM }) => ($isMD ? '22px' : getValueBasedOnResolution($isSM, '15px', '28px'))};
    z-index: 3;
    width: ${({ $isMD, $isSM }) => ($isMD ? '60%' : getValueBasedOnResolution($isSM, '70%', '50%'))};
    color: white;
`;

const ButtonWrapper = styled.div<{ $isSM: boolean }>`
    display: ${({ $isSM }) => ($isSM ? 'grid' : 'flex')};
    width: 40%;
    left: 20px; bottom: ${({ $isSM }) => ($isSM ? '100px' : '30px')};
    position: absolute;
    gap: 20px; z-index: 20;
`;

export const CoverMovie = memo((props: { movieItem: IMovie }) => {

    const { backdrop_path, original_title, overview, release_date, poster_path, id, title } = props.movieItem;
    const { movieDetails: { videos } } = useFetchMovieDetails(id);
    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { isMD, isSM } = useDisplaySizeGroup();

    const onPlayClick = () => (setPlayVideo(true));
    const onClose = () => (setPlayVideo(false));

    const trimmedOverview = useMemo(() => (
        isSM ? overview.slice(0, 120) + '...' : overview
    ), [isSM, overview]);

    return (
        <>
            <StyledWrapper>
                <div className="flex flex-col absolute text-start gap-5 p-5 ml-[3%] md:mt-[10%] mt-[5%]">
                    <TitleWrapper $isMD={isMD} $isSM={isSM}>{original_title}</TitleWrapper>
                    <StyledPara $isMD={isMD} $isSM={isSM}>{trimmedOverview}</StyledPara>
                </div>
                <StyledImage src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} $isSM={isSM} $isMD={isMD} />
                <StyledPoster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} $isSM={isSM} $isMD={isMD} />
                <ButtonWrapper $isSM={isSM}>
                    <button className="text-lg p-2 text-black border-[1px] rounded-md bg-[#ffffff]">
                        <Link to={`/${title}/${id}`}>More Info</Link>
                    </button>
                    <button className="text-lg p-2 text-white border-[1px] rounded-md bg-red-600" onClick={onPlayClick}>Watch</button>
                </ButtonWrapper>
                {
                    (isMD || isSM) ? null : <ReleaseDateWrapper>{release_date}</ReleaseDateWrapper>
                }
            </StyledWrapper>
            {
                playVideo ?
                    <>
                        {/* <PlayTrailer onClick={onClose} videos={videos} /> */}
                    </>
                    : null
            }
        </>
    );

})