import { memo, useCallback, useMemo, useState } from "react";
import { useGetFavourites } from "../../hooks/use-get-favourites";
import { Card } from "../card/movie-card";
import { IMovie } from "../../types";
import { IoCloseOutline } from "react-icons/io5";
import { clearFavourites } from "../../store";
import { useDispatch } from "react-redux";
import { useDisplaySizeGroup, useTranslator } from "../../hooks";
import { Popup } from "../popup";
import { StyledFlex, StyledLink, StyledSpan, StyledWrapper } from "./fav-styles";
import { getClassNames } from "../utils";

const Favourites = memo(() => {

    const { favourites: { movie: favMovies, tvshow: favShows }, getIsFavourite } = useGetFavourites();
    const dispatch = useDispatch();

    const [hidden, setHidden] = useState<boolean>(true);

    const { isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const renderContent = useCallback((shows: IMovie[], type: 'movie' | 'tvshow') => (
        shows.map((item) => (
            <Card item={item} isFavourite={getIsFavourite(item.id, type)} key={item.id} canViewSimillar={false} canShowWishlist={false} />
        ))
    ), [getIsFavourite]);

    const clearFavoritesList = useCallback(() => (
        dispatch(clearFavourites())
    ), [dispatch]);

    const toggleHidden = useCallback(() => (setHidden(!hidden)), [hidden]);

    const onPositiveAction = useCallback(() => {
        clearFavoritesList();
        toggleHidden();
    }, [clearFavoritesList, toggleHidden]);

    const canClear = useMemo(() => (
        favShows.length || favMovies.length
    ), [favMovies.length, favShows.length]);

    const onClear = useCallback(() => {
        if (canClear) {
            toggleHidden()
        }
    }, [canClear, toggleHidden]);

    return (
        <>
            <StyledWrapper>
                <div
                    role="none"
                    className={getClassNames([
                        "flex gap-[2px] self-end items-center",
                        "mr-[20px] mt-[10px] border rounded-md p-[3px] max-h-[30px] bg-white text-black",
                        `${canClear ? 'cursor-pointer' : 'cursor-not-allowed'}`,
                        `${canClear && 'hover:text-red-600'} ${canClear ? 'opacity-[1]' : 'opacity-[0.6]'}`
                    ])}
                    onClick={onClear}
                >
                    <IoCloseOutline size="22px" />
                    <h6>{translate('favourites.clearShows')}</h6>
                </div>
                <div className="flex flex-col p-[10px 0px] gap-[12px]">
                    <h1 className="ml-[4%] font-serif text-2xl">{translate('favourites.favouriteMovies')}</h1>
                    <StyledFlex $isData={!!favMovies.length}>
                        {
                            favMovies.length ? renderContent(favMovies, 'movie') :
                                <StyledSpan $isSM={isSM}>
                                    {translate('favourites.noFavourites')}
                                    <StyledLink to="/movies">{translate('favourites.addMoviesToFavourites')}</StyledLink>
                                </StyledSpan>
                        }
                    </StyledFlex>
                </div>
                <hr />
                <div className="flex flex-col p-[10px 0px] gap-[12px]">
                    <h1 className="ml-[4%] font-serif text-2xl">{translate('favourites.favShows')}</h1>
                    <StyledFlex $isData={!!favShows.length}>
                        {
                            favShows.length ? renderContent(favShows, 'tvshow') :
                                <StyledSpan $isSM={isSM}>
                                    {translate('favourites.noFavouritess')}
                                    <StyledLink to="/tvshows">{translate('favourites.addShowsToFavourites')}</StyledLink>
                                </StyledSpan>
                        }
                    </StyledFlex>
                </div>
            </StyledWrapper>
            {
                hidden ? null : <Popup message={translate('favourites.clearShowsMessage')}
                    onPositiveAction={onPositiveAction} type="warning" onNegativeAction={toggleHidden} />
            }
        </>
    )
});

export default Favourites;