import { memo, useCallback, useMemo, useState } from "react";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { Card } from "./movie-card";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMovie } from "../types";
import { IoCloseOutline } from "react-icons/io5";
import { clearFavourites } from "../store";
import { useDispatch } from "react-redux";
import { useDisplaySizeGroup } from "../hooks";
import { Popup } from "./popup";

const StyledFlex = styled.div<{ $isData: boolean }>`
    display: flex;
    overflow-x: auto;
    overflow-y: visible;
    justify-content: ${({ $isData }) => ($isData ? 'unset' : 'center')};
    padding-bottom: 30px;
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`;

const StyledSpan = styled.span<{ $isSM: boolean }>`
    font-family: sans-serif;
    font-size: ${({ $isSM }) => ($isSM ? '18px' : '25px')};
    font-weight: 600;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${({ $isSM }) => ($isSM ? '10px' : '20px')};
    position: relative;
`;

const StyledLink = styled(Link)`
    font-weight: 700;
    color: #118bf7;
`;

const Favourites = memo(() => {

    const { favourites: { movie: favMovies, tvshow: favShows }, getIsFavourite } = useGetFavourites();
    const dispatch = useDispatch();

    const [hidden, setHidden] = useState<boolean>(true);

    const { isSM } = useDisplaySizeGroup();

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
                <div className={`flex gap-[2px] self-end items-center ${canClear ? 'cursor-pointer' : 'cursor-not-allowed'}
                     mr-[20px] mt-[10px] border rounded-md p-[3px] max-h-[30px] bg-white text-black
                       ${canClear && 'hover:text-red-600'} ${canClear ? 'opacity-[1]' : 'opacity-[0.6]'}`}
                    onClick={onClear}>
                    <IoCloseOutline size="22px" />
                    <h6>Clear Favourites</h6>
                </div>
                <div className="flex flex-col p-[10px 0px] gap-[12px]">
                    <h1 className="ml-[4%] font-serif text-2xl">Favourite Movies</h1>
                    <StyledFlex $isData={!!favMovies.length}>
                        {
                            favMovies.length ? renderContent(favMovies, 'movie') :
                                <StyledSpan $isSM={isSM}>
                                    No favourites
                                    <StyledLink to="/categories">Add Movie To Favourites</StyledLink>
                                </StyledSpan>
                        }
                    </StyledFlex>
                </div>
                <hr />
                <div className="flex flex-col p-[10px 0px] gap-[12px]">
                    <h1 className="ml-[4%] font-serif text-2xl">Favourite Shows</h1>
                    <StyledFlex $isData={!!favShows.length}>
                        {
                            favShows.length ? renderContent(favShows, 'tvshow') :
                                <StyledSpan $isSM={isSM}>
                                    No favourites
                                    <StyledLink to="/tvshows">Add Shows To Favourites</StyledLink>
                                </StyledSpan>
                        }
                    </StyledFlex>
                </div>
            </StyledWrapper>
            {
                hidden ? null : <Popup message="Action will erase all the movies and shows from Favourites list. Are you sure want to continue?"
                    onPositiveAction={onPositiveAction} type="warning" onNegativeAction={toggleHidden} />
            }
        </>
    )
});

export default Favourites;