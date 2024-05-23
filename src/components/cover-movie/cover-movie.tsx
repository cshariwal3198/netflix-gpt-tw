import { memo, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDisplaySizeGroup, useTranslator } from "../../hooks";
import { useFetchMovieOrShowDetails } from "../../hooks/get-movie-details";
import { IMovie } from "../../types";
import { ButtonWrapper, ReleaseDateWrapper, StyledIframe, StyledPara, StyledPoster, StyledWrapper, TitleWrapper } from "./cover-styles";
import { PlayTrailer } from "../play-trialer";
import { getClassNames } from "../utils";

export const CoverMovie = memo(({ movieItem }: { movieItem: IMovie }) => {

    const { original_title, overview, release_date, poster_path, id } = movieItem;
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
                <div className={getClassNames([
                    "flex flex-col absolute text-start rounded-lg h-[100%] p-5 pl-[3%] sm:w-[70%] w-[100%]",
                    "bg-gradient-to-r dark:from-black from-[#ffffffce]"
                ])}>
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
                    <PlayTrailer onClick={() => (setPlayVideo(false))} keyToPlay={trailerKey} />
                    : null
            }
        </>
    );

})