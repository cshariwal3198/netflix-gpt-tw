import { SyntheticEvent, memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { addToFavourites, removeFromFavourites } from "../store/favourites-slice";
import { useDispatch } from "react-redux";
import { StyledHeart } from "../common-styles";
import { MovieDetail } from "./movie-detail";
import { useDisplaySizeGroup } from "../hooks";
import { getValueBasedOnResolution } from "./utils";

interface ICardProps {
    item: IMovie, isFavourite: boolean, canViewSimillar: boolean, type?: 'movie' | 'tvshow', canShowDetails?: boolean,
    canShowWishlist?: boolean
}

const StyledMovieCard = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '225px' : getValueBasedOnResolution($isMD, '250px', '280px'))};
    max-width: ${({ $isSM, $isMD }) => ($isSM ? '160px' : getValueBasedOnResolution($isMD, '175px', '210px'))};
    min-width: 160px;
    position: relative;
    text-align: center;

    &:hover{
        transform: scale(1.1);
        transition: cubic-bezier(0.39, 0.575, 0.565, 1) 1.2s;
    }
`;

const StyledImage = styled.img`
    height: 420px;
    opacity: 0.8;
    filter: contrast(0.8);
    -webkit-filter: brightness(0.8);
    border-radius: 8px;
`;

const StyledSpan = styled.span`
    position: absolute;
    top: 15px;
    font-weight: 500;
    padding: 10px;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    transform: none;
`;

const StyledOverview = styled(StyledSpan) <{ $hover: boolean, $isSM: boolean }>`
    bottom: 30px;
    top: unset;
    opacity: ${({ $hover }) => ($hover ? '0.7' : '0.1')};
    margin-left: 0px;
    font-weight: ${({ $isSM }) => ($isSM ? 400 : 500)};
    cursor: default;
`;

export const Card = memo(({ item, isFavourite, canViewSimillar, type, canShowDetails, canShowWishlist = true }: ICardProps) => {

    const { overview, poster_path, title, id } = item;

    const [hover, setHover] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(canShowDetails || false);
    const dispatch = useDispatch();
    const { isMD, isSM } = useDisplaySizeGroup();

    const slicedOverview = useMemo(() => (isSM || isMD ? `${overview.slice(0, 50)}...` : `${overview.slice(0, 100)}...`), [isMD, isSM, overview]);

    const onMouseOver = useCallback(() => (setHover(true)), []);
    const onMouseLeave = useCallback(() => (setHover(false)), []);

    const onClick = useCallback((e: SyntheticEvent) => {
        e.stopPropagation();
        isFavourite ? dispatch(removeFromFavourites({ id, type })) : dispatch(addToFavourites({ item, type }));
    }, [dispatch, id, isFavourite, item, type]);

    const openMovieInfo = useCallback(() => {
        if (canShowDetails !== false) {
            setShowInfo(true);
        }
    }, [canShowDetails]);

    return (
        <>
            <StyledMovieCard onMouseOver={onMouseOver} onMouseOut={onMouseLeave} onClick={openMovieInfo} $isSM={isSM} $isMD={isMD}>
                <StyledSpan>{title}</StyledSpan>
                <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
                <StyledOverview $hover={hover} $isSM={isSM || isMD}>{slicedOverview}</StyledOverview>
                {
                    hover && canShowWishlist ? <StyledHeart size="40px" title="Add to fav" onClick={onClick} $isFavourite={isFavourite} /> : null
                }
            </StyledMovieCard>
            {
                showInfo ? <MovieDetail movieItem={item} isFavourite={isFavourite} setShowInfo={setShowInfo} canViewSimillar={canViewSimillar} type={type} /> : null
            }
        </>
    );
});
