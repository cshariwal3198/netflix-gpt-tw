import React, { SyntheticEvent, memo, useCallback } from "react";
import styled from 'styled-components';
import { IMovie } from "../types";
import { useDisplaySizeGroup } from "../hooks";
import { StyledHeart } from "../common-styles";
import { addToFavourites, removeFromFavourites } from "../store/favourites-slice";
import { useDispatch } from "react-redux";
import { useFetchMovieDetails } from "../hooks/get-movie-details";
import { Link } from "react-router-dom";

const StyledFav = styled(StyledHeart)`
    right: 30px;
    bottom: 30px;
`;

const Wrapper = styled.div<{ $isSM: boolean, $backdrop: string }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '1fr 2fr')};
    column-gap: 30px;
`;

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%; width: 100%;
    padding: 15px;
    row-gap: 25px;
    position: relative;
    overflow: auto;
    margin-top: 10px;
`;

const StyledProd = styled.div`
    display: flex;
    height: fit-content;
    justify-content: space-center;
    align-items: center;
    width: 100%;
    padding: 20px;
    column-gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
`;

const StyledProdImage = styled.img`
    height: 35px;
`;

const StyledSpan = styled.span`
    width: fit-content;
    padding: 8px;
    padding-left: 10px;
    padding-right: 10px;
    background: none;
    border: 1px solid;
    border-radius: 20px;
    font: 500; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const MovieDetail = memo(({ movieItem, isFavourite, setShowInfo, canViewSimillar }: { movieItem: IMovie, isFavourite: boolean, setShowInfo: (arg: boolean) => void, canViewSimillar: boolean }) => {

    const { id, poster_path, overview, original_title, backdrop_path } = movieItem;
    const { isMD, isSM, isLG } = useDisplaySizeGroup();
    const { movieDetails } = useFetchMovieDetails(id);
    const dispatch = useDispatch();

    const onClick = useCallback((e: SyntheticEvent) => {
        if (e.target === e.currentTarget) {
            setShowInfo(false);
        }
    }, [setShowInfo]);

    const onFavouriteClick = useCallback(() => {
        isFavourite ? dispatch(removeFromFavourites(id)) : dispatch(addToFavourites(movieItem))
    }, [dispatch, id, isFavourite, movieItem]);

    const renderGenres = useCallback(() => {
        return movieDetails?.genres?.map(({ id, name }) => (
            <StyledSpan key={id}>{name}</StyledSpan>
        ))
    }, [movieDetails.genres]);

    const renderProduction = useCallback(() => (
        movieDetails?.production_companies?.map(({ logo_path, name }) => (
            <React.Fragment key={name}>
                <StyledProdImage src={`https://image.tmdb.org/t/p/w500/${logo_path}`} alt="" />
                <h6 className="break-keep">{name}</h6>
            </React.Fragment>
        ))
    ), [movieDetails?.production_companies]);

    const renderVideos = useCallback(() => (
        movieDetails?.videos?.results?.slice(0, 5).map(({ id, key, name }) => (
            <div className="h-40 w-60 mr-14" key={id}>
                <iframe src={`https://www.youtube.com/embed/${key}`} title={name}></iframe>
            </div>
        ))
    ), [movieDetails?.videos?.results]);

    return (
        <div className="flex flex-col justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-10 bg-[#000000B3] h-full w-full" onClick={onClick}>
            <Wrapper
                className="h-[80%] w-[90%] justify-center items-center bg-slate-100 border-slate-800 rounded-lg overflow-hidden dark:bg-zinc-700"
                $isSM={isSM || isMD}
                $backdrop={backdrop_path}
            >
                {
                    isLG ? <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" /> : null
                }
                <StyledContent>
                    <h1 className="font-extrabold font-serif text-4xl self-center">{original_title}</h1>
                    <h3 className="font-thin font-serif text-lg">{overview}</h3>
                    <div className="flex gap-4 justify-start">{renderGenres()}</div>
                    <span className="font-serif text-2xl">Status: {movieDetails?.status}</span>
                    {
                        movieDetails?.belongs_to_collection?.name ?
                            <span className="font-serif text-lg">From {movieDetails?.belongs_to_collection?.name}</span> : null
                    }
                    <StyledProd>
                        <h1 className="text-2xl text-sky-800 mr-5">Creators </h1>
                        {renderProduction()}
                    </StyledProd>
                    <div className="flex gap-5 p-4 overflow-auto">
                        {renderVideos()}
                    </div>
                    {
                        canViewSimillar ?
                            <Link className="font-bold text-xl justify-center text-blue-700" to={`/${id}`}>View Simillar</Link> : null
                    }
                    <StyledFav $isFavourite={isFavourite} size="60px" onClick={onFavouriteClick} />
                </StyledContent>
            </Wrapper>
        </div>
    )
})
