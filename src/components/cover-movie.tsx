import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { useDisplaySizeGroup, useTranslator } from "../hooks";
import { Link } from "react-router-dom";
import { useFetchMovieOrShowDetails } from "../hooks/get-movie-details";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: ${({ $isSM, $isMD }) => ($isSM ? '40vh' : getValueBasedOnResolution($isMD, '60vh', '75vh'))};
    text-align: center;
    margin-top: 8px;
    border: 1px solid ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    border-radius: 10px;
`;

const StyledPoster = styled.img<{ $isSM: boolean, $isMD: boolean }>`
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '20vh' : getValueBasedOnResolution($isMD, '30vh', '40vh'))};
    position: absolute;
    z-index: 2;
    bottom: -30px;
    right: ${({ $isSM }) => ($isSM ? '5%' : '8%')};
    border-radius: 20px;
    box-shadow: 10px 12px 10px 0px ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
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
    font-weight: ${({ $isMD, $isSM }) => ($isSM ? '600' : getValueBasedOnResolution($isMD, '600', '700'))};
    font-size: ${({ $isMD, $isSM }) => ($isSM ? '1.5rem' : getValueBasedOnResolution($isMD, '2rem', '2.5rem'))};
    z-index: 2;
    font-family: serif;
`;

const ReleaseDateWrapper = styled(StyledSpan)`
    left: unset;
    top: 30px;
    right: 3%;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    font-size: 24px;
`;

const StyledPara = styled.p <{ $isMD: boolean, $isSM: boolean }>`
    font-family: serif;
    font-weight: 300;
    font-size: ${({ $isMD, $isSM }) => ($isSM ? '18px' : getValueBasedOnResolution($isMD, '21px', '24px'))};
    z-index: 3;
    width: ${({ $isMD, $isSM }) => ($isSM ? '60%' : getValueBasedOnResolution($isMD, '70%', '70%'))};
`;

const ButtonWrapper = styled.div<{ $isSM: boolean }>`
    display: ${({ $isSM }) => ($isSM ? 'grid' : 'flex')};
    width: 40%;
    left: 4%; bottom: ${({ $isSM }) => ($isSM ? '50px' : '30px')};
    position: absolute;
    gap: 20px; z-index: 10;
`;

const StyledIframe = styled.iframe`
    border-radius: 10px;
    z-index: -1;
    opacity: 0.7;
`;

export const CoverMovie = memo((props: { movieItem: IMovie }) => {

    const { original_title, overview, release_date, poster_path, id } = props.movieItem;
    const { showDetails: { videos } } = useFetchMovieOrShowDetails(id, 'movie');
    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { isMD, isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const onPlayClick = () => (setPlayVideo(true));

    const trimmedOverview = useMemo(() => (
        isSM ? overview.slice(0, 120) + '...' : overview
    ), [isSM, overview]);

    const trailerKey = useMemo(() => ((videos?.results?.find(({ name }) => (name.toLowerCase() === 'official trailer')) || videos?.results[0])?.key), [videos?.results]);

    return (
        <>
            <StyledWrapper $isSM={isSM} $isMD={isMD}>
                <div className="flex flex-col absolute text-start rounded-lg h-[100%] p-5 pl-[3%] sm:w-[70%] w-[100%] bg-gradient-to-r dark:from-black from-[#ffffffce]">
                    <TitleWrapper $isMD={isMD} $isSM={isSM}>{original_title}</TitleWrapper>
                    <StyledPara $isMD={isMD} $isSM={isSM}>{trimmedOverview}</StyledPara>
                </div>
                <StyledIframe className="h-[100%] w-[100%] aspect-video"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&vq=hd1080`} title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></StyledIframe>
                <StyledPoster src={`https://image.tmdb.org/t/p/w500/${poster_path}`} $isSM={isSM} $isMD={isMD} />
                <ButtonWrapper $isSM={isSM}>
                    <button className="text-lg p-2 text-black border-[1px] rounded-md bg-[#ffffff]">
                        <Link to={`/movie/${id}`}>{translate('movieDetails.moreInfo')}</Link>
                    </button>
                    <button className="text-lg p-2 text-white border-[1px] rounded-md bg-red-600" onClick={onPlayClick}>{translate('general.watch')}</button>
                </ButtonWrapper>
                <ReleaseDateWrapper>{release_date}</ReleaseDateWrapper>
            </StyledWrapper>
            {
                playVideo ?
                    <>
                        {/* <PlayTrailer onClick={() => (setPlayVideo(false))} videos={videos} /> */}
                    </>
                    : null
            }
        </>
    );

})