import { memo, useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchMovieOrShowDetails } from "../../hooks/get-movie-details";
import { IMovie, ITvShowDeatils } from "../../types";
import { useDisplaySizeGroup, useGetFavourites, useTranslator } from "../../hooks";
import { BiStar, BiCalendar } from "react-icons/bi";
import { FaHeart, FaPlay } from "react-icons/fa";
import { StyledSpan } from "../../common-styles";
import { Card } from "../card/movie-card";
import { PlayTrailer } from "../play-trialer";
import { getValueBasedOnResolution } from "../utils";
import { ShowCredit } from "../credits/credit-info";
import { useDispatch } from "react-redux";
import { addToFavourites, removeFromFavourites } from "../../store";
import { Popup } from "../popup";
import { StyledBackground, StyledButton, StyledFlex, StyledGrid, StyledImage, StyledInnerGrid, StyledPara, StyledSimillarDiv, StyledText, StyledVideoItem, VideosWrapper } from "./styles";

const MovieInfo = memo(() => {

    const { type = 'movie', id } = useParams();
    const { showDetails, simillarShowsData } = useFetchMovieOrShowDetails(Number(id), type as 'movie' | 'tvshow');
    const { getIsFavourite } = useGetFavourites();
    const isWishListed = useMemo(() => getIsFavourite(Number(id), type as 'movie' | 'tvshow'), [getIsFavourite, id, type]);
    const [keyToPlay, setKeyToPlay] = useState<string>('');
    const [canShowSliced, setCanShowSliced] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(true);
    const dispatch = useDispatch();

    const [playVideo, setPlayVideo] = useState<boolean>(false);

    const { isMD, isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const { backdrop_path, poster_path, genres, overview, vote_average, original_title, tagline, release_date, videos, name, homepage } = showDetails as ITvShowDeatils;

    const renderGenres = useCallback(() => {
        return genres?.map(({ id, name }) => (
            <StyledSpan key={id}>{name}</StyledSpan>
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

    const alterShowMore = useCallback(() => (setCanShowSliced(!canShowSliced)), [canShowSliced]);

    const onWishList = useCallback(() => (
        isWishListed ? dispatch(removeFromFavourites({ id, type })) : dispatch(addToFavourites({ item: showDetails, type }))
    ), [dispatch, id, isWishListed, showDetails, type]);

    const renderOverView = useCallback(() => {
        if (overview?.length > 300) {
            return (
                !canShowSliced ?
                    (<>
                        {overview?.slice(0, 320)}... <StyledPara onClick={alterShowMore}>{translate('movieDetails.seeMore')}</StyledPara>
                    </>)
                    : (<>
                        {overview}... <StyledPara onClick={alterShowMore}>see less</StyledPara>
                    </>)
            )
        }
        return overview;
    }, [alterShowMore, canShowSliced, overview, translate]);

    const renderRelatedVideos = useCallback(() => (
        videos?.results?.length ?
            <VideosWrapper $isSM={isSM}>
                {
                    videos?.results.slice(0, 10).map(({ name, key }) => (
                        <StyledVideoItem key={key} $isSM={isSM}>
                            <h6 className="sm:text-lg text-[15px]">{name}</h6>
                            <button className="flex justify-center items-center sm:text-lg text-[15px] cursor-pointer text-red-500" onClick={() => onPlayVideo(key)}>{translate('general.play')}</button>
                        </StyledVideoItem>
                    ))
                }
            </VideosWrapper> : <h6 className="text-xl">{translate('movieDetails.noVideosFound')}</h6>
    ), [isSM, onPlayVideo, translate, videos?.results]);

    const renderSimillarSuggestion = useCallback(() => (
        !simillarShowsData.isLoading && simillarShowsData?.data?.results?.length ?
            simillarShowsData?.data?.results.map((item: IMovie) => (
                item.backdrop_path && item.poster_path ?
                    <Card isFavourite={false} item={item} key={item?.original_title} canViewSimillar={false} canShowDetails={false} /> : null
            )) :
            <h1>{translate('movieDetails.noSimillarShows')}</h1>
    ), [simillarShowsData?.data?.results, simillarShowsData.isLoading, translate]);

    const renderWishListAndPlay = useCallback(() => {

        return (
            <StyledFlex>
                <StyledButton $isSM={isSM} $isMD={isMD} $isWishlisted={isWishListed} onClick={onWishList}><FaHeart />{translate('general.wishList')}</StyledButton>
                <StyledButton $isSM={isSM} $isMD={isMD} onClick={onPlayClick}> <FaPlay />{translate('general.play')} </StyledButton>
            </StyledFlex>
        );
    }, [isMD, isSM, isWishListed, onPlayClick, onWishList, translate]);

    const toggleHidden = useCallback(() => (setHidden(!hidden)), [hidden]);

    const onPositiveAction = useCallback(() => {
        toggleHidden();
        window.open(homepage);
    }, [homepage, toggleHidden]);

    return (
        <>
            <div className="flex flex-col items-center">
                <StyledBackground src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`} alt={translate('general.noImage')} />
                <div className="flex flex-col gap-4 justify-center relative">
                    <StyledGrid $isSM={isSM}>
                        <StyledImage $isSM={isSM} $isMD={isMD} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={translate('general.noImage')} />
                        <StyledInnerGrid $isSM={isSM || isMD}>
                            <div className="flex flex-col gap-y-3 ml-2 sm:justify-center">
                                <h1 className={`font-sans ${isSM ? 'text-[25px]' : getValueBasedOnResolution(isMD, 'text-[35px]', 'text-[45px]')}`}>{original_title || name}</h1>
                                {
                                    tagline ? <h4 className="shadow-[rgb(21, 21, 21) 0px 0px 5px] text-[18px] italic self-center">{tagline}</h4> : null
                                }
                                <StyledFlex>
                                    <h6 className="flex gap-2 items-center text-[16px]"><BiStar size="25px" />{vote_average}</h6>
                                    <h6 className="flex gap-2 items-center text-[16px]"><BiCalendar size="25px" />{release_date}</h6>
                                </StyledFlex>
                                {renderWishListAndPlay()}
                            </div>
                            <div className="flex flex-col gap-5 justify-center">
                                <div className="flex gap-5 flex-wrap">{renderGenres()}</div>
                                <h4 className={`font-light ${isSM ? 'text-lg' : getValueBasedOnResolution(isMD, 'text-lg', 'text-xl')}`}>
                                    {renderOverView()}
                                </h4>
                                <h4 className={`font-light ${isSM ? 'text-lg' : getValueBasedOnResolution(isMD, 'text-lg', 'text-xl')}`}>
                                    {translate('movieDetails.goto')} : <StyledText onClick={toggleHidden}>{translate('movieDetails.officialPage')}</StyledText>
                                </h4>
                            </div>
                        </StyledInnerGrid>
                    </StyledGrid>
                    <div className="flex flex-col gap-1 justify-center font-sans p-2">
                        <h5 className="text-3xl">{translate('movieDetails.relatedVideos')}</h5>
                        {
                            renderRelatedVideos()
                        }
                    </div>
                </div>
                <ShowCredit type={type} id={id!} />
                <div className="flex flex-col gap-4 justify-start p-3 relative w-full">
                    <h1 className={`font-sans ${isSM || isMD ? 'text-[28px]' : 'text-[35px]'}`}>{translate('general.simillar')} {type === 'Movie' ? `${translate('general.movies')}` : `${translate('general.shows')}`}</h1>
                    <StyledSimillarDiv>
                        {
                            renderSimillarSuggestion()
                        }
                    </StyledSimillarDiv>
                </div>
                {
                    playVideo ? <PlayTrailer keyToPlay={keyToPlay} onClick={onPlayClose} /> : null
                }
            </div >
            {
                hidden ? null :
                    <Popup message={translate('movieDetails.gotoOfficialPageMessage')}
                        onPositiveAction={onPositiveAction} type="info" onNegativeAction={toggleHidden} />
            }
        </>
    );
});

export default MovieInfo;
