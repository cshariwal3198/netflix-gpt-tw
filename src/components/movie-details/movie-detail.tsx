import React, { SyntheticEvent, memo, useCallback } from "react";
import { useDisplaySizeGroup, useTranslator } from "../../hooks";
import { StyledSpan } from "../../common-styles";
import { addToFavourites, removeFromFavourites } from "../../store/favourites-slice";
import { useDispatch } from "react-redux";
import { useFetchMovieOrShowDetails } from "../../hooks/get-movie-details";
import { Link, useNavigate } from "react-router-dom";
import { StyledContent, StyledFav, StyledLabel, StyledProd, StyledProdImage, Wrapper } from "./styles";
import { IMovieDetailProps } from "./types";
import { getClassNames } from "../utils";

export const MovieDetail = memo(({ movieItem, isFavourite, setShowInfo, canViewSimillar, type = 'movie' }: IMovieDetailProps) => {

    const { id, poster_path, overview, original_title, backdrop_path, name } = movieItem;
    const { isMD, isSM, isLG } = useDisplaySizeGroup();
    const navigate = useNavigate();

    const { showDetails } = useFetchMovieOrShowDetails(id, type);

    const dispatch = useDispatch();
    const { translate } = useTranslator();

    const onClick = useCallback((e: SyntheticEvent) => {
        if (e.target === e.currentTarget) {
            setShowInfo(false);
        }
    }, [setShowInfo]);

    const onFavouriteClick = useCallback(() => {
        isFavourite ? dispatch(removeFromFavourites({ id, type })) : dispatch(addToFavourites({ item: movieItem, type }))
    }, [dispatch, id, isFavourite, movieItem, type]);

    const renderGenres = useCallback(() => (
        showDetails?.genres?.map(({ id, name }) => (
            <StyledSpan key={id}>{name}</StyledSpan>
        ))
    ), [showDetails.genres]);

    const renderProduction = useCallback(() => (
        showDetails?.production_companies?.map(({ logo_path, name }) => (
            <React.Fragment key={name}>
                <StyledProdImage src={`https://image.tmdb.org/t/p/w500/${logo_path}`} alt="" />
                <h6 className="break-keep">{name}</h6>
            </React.Fragment>
        ))
    ), [showDetails?.production_companies]);

    const renderVideos = useCallback(() => (
        showDetails?.videos?.results.length ? (
            <div className="flex gap-5 p-4 overflow-auto min-h-[200px]">
                {
                    showDetails.videos.results?.slice(0, 5).map(({ id, key, name }) => (
                        <div className="h-40 w-60 mr-14" key={id}>
                            <iframe src={`https://www.youtube.com/embed/${key}`} title={name}></iframe>
                        </div>
                    ))
                }
            </div>
        ) : null
    ), [showDetails?.videos?.results]);

    const onRouteClick = useCallback(() => (
        navigate(`/${type}/${id}`)
    ), [id, navigate, type]);

    return (
        <div role="none" className={getClassNames([
            "flex flex-col justify-center items-center", "absolute top-0 right-0 bottom-0 left-0 z-10",
            "bg-[#000000B3] h-[100vh] w-[100vw]"
        ])} onClick={onClick}>
            <Wrapper
                className={getClassNames([
                    "h-[80%] w-[90%] relative justify-center items-center",
                    "bg-[#ffffffbe] border-slate-800 rounded-lg overflow-hidden dark:bg-zinc-700"])}
                $isSM={isSM || isMD}
                $backdrop={backdrop_path}
            >
                {
                    isLG ? <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" /> : null
                }
                <StyledContent>
                    <span className="flex font-extrabold font-serif text-3xl h-[50px] self-center items-center">{original_title || name}</span>
                    <h3 className="font-thin font-serif text-base py-2">{overview}</h3>
                    <div className="flex flex-wrap gap-4 justify-start">
                        {renderGenres()}
                    </div>
                    <span className="font-serif text-2xl">{translate('movieDetails.status')}: {showDetails?.status}</span>
                    {
                        showDetails?.belongs_to_collection?.name ?
                            <span className="font-serif text-lg">{translate('general.from')} {showDetails?.belongs_to_collection?.name}</span> : null
                    }
                    <StyledProd>
                        <h1 className="text-2xl text-[yellow] mr-5">{translate('movieDetails.creators')} </h1>
                        {renderProduction()}
                    </StyledProd>
                    {
                        renderVideos()
                    }
                    {
                        canViewSimillar ?
                            <div className="flex justify-around items-center">
                                <Link className="font-bold text-xl justify-center text-blue-700" to={`/simillar/${type}/${id}`}>{translate('movieDetails.viewSimillar')}</Link>
                                <StyledLabel onClick={onRouteClick}>{translate('movieDetails.moreInfo')}</StyledLabel>
                            </div> : null
                    }
                    <div className="flex md:h-[80px] h-[40px] w-full items-center justify-center">
                        <StyledFav $isFavourite={isFavourite} size={isSM ? '60px' : '80px'} onClick={onFavouriteClick} title={translate('movieDetails.addToFavourites')} />
                    </div>
                </StyledContent>
            </Wrapper>
        </div>
    )
})
