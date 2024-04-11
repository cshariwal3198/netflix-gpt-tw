import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { addToFavourites, removeFromFavourites } from "../store/favourites-slice";
import { useDispatch } from "react-redux";
import { StyledHeart } from "../common-styles";
import { MovieDetail } from "./movie-detail";

const StyledMovieCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-width: 360px;
    position: relative;
    text-align: center;

    &:hover{
        transform: scale(1.2);
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
    top: 25px;
    font-weight: 500;
    padding: 10px;
    color: white;
    transform: none;
`;

const StyledOverview = styled(StyledSpan) <{ $hover: boolean }>`
    bottom: 30px;
    top: unset;
    opacity: ${({ $hover }) => ($hover ? '1' : '0.1')};
`;

export const Card = memo(({ item, isFavourite, canViewSimillar }: { item: IMovie, isFavourite: boolean,  canViewSimillar: boolean }) => {

    const { overview, poster_path, title, id } = item;

    const [hover, setHover] = useState<boolean>(false);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const dispatch = useDispatch();

    const slicedOverview = useMemo(() => `${overview.slice(0, 100)}...`, [overview]);

    const onMouseOver = useCallback(() => (setHover(true)), []);
    const onMouseLeave = useCallback(() => (setHover(false)), []);

    const onClick = useCallback(() => {
        isFavourite ? dispatch(removeFromFavourites(id)) : dispatch(addToFavourites(item))
    }, [dispatch, id, isFavourite, item]);

    const openMovieInfo = useCallback(() => (setShowInfo(true)), []);

    return (
        <>
            <StyledMovieCard onMouseOver={onMouseOver} onMouseOut={onMouseLeave} onClick={openMovieInfo}>
                <StyledSpan>{title}</StyledSpan>
                <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
                <StyledOverview $hover={hover}>{slicedOverview}</StyledOverview>
                {
                    hover ? <StyledHeart size="40px" title="Add to fav" onClick={onClick} $isFavourite={isFavourite} /> : null
                }
            </StyledMovieCard>
            {
                showInfo ? <MovieDetail movieItem={item} isFavourite={isFavourite} setShowInfo={setShowInfo} canViewSimillar={canViewSimillar} /> : null
            }
        </>
    );
});