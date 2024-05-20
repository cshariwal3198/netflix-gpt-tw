import { SyntheticEvent, memo, useCallback, useMemo, useState } from "react";
import { addToFavourites, removeFromFavourites } from "../../store/favourites-slice";
import { useDispatch } from "react-redux";
import { StyledHeart } from "../../common-styles";
import { MovieDetail } from "../movie-details/movie-detail";
import { useDisplaySizeGroup } from "../../hooks";
import { ICardProps } from "./types";
import { StyledImage, StyledMovieCard, StyledOverview, StyledSpan } from "./card-styles";

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
