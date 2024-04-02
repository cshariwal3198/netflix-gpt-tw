import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { FaHeart } from 'react-icons/fa';
import { addToFavourites, removeFromFavourites } from "../store/favourites-slice";
import { useDispatch } from "react-redux";

const StyledMovieCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-width: 350px;
    position: relative;
    text-align: center;

    &:hover{
        transform: scale(1.2);
        transition: cubic-bezier(0.39, 0.575, 0.565, 1) 1.2s;
    }
`;

const StyledImage = styled.img`
    height: 400px;
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

const StyledOverview = styled(StyledSpan)`
    bottom: 30px;
    top: unset;
`;

const StyledHeart = styled(FaHeart) <{ $isFavourite: boolean }>`
    position: absolute;
    bottom: 20px;
    right: 30px;
    fill: ${({ $isFavourite }) => ($isFavourite ? 'red' : 'white')};
    cursor: pointer;
`;

export const Card = memo(({ item, isFavourite }: { item: IMovie, isFavourite: boolean }) => {

    const { overview, poster_path, title, id } = item;

    const [hover, setHover] = useState<boolean>(false);
    const dispatch = useDispatch();

    const slicedOverview = useMemo(() => `${overview.slice(0, 100)}...`, [overview]);

    const onMouseOver = useCallback(() => (setHover(true)), []);
    const onMouseLeave = useCallback(() => (setHover(false)), []);

    const onClick = useCallback(() => {
        isFavourite ? dispatch(removeFromFavourites(id)) : dispatch(addToFavourites(item))
    }, [dispatch, id, isFavourite, item]);

    return (
        <StyledMovieCard onMouseOver={onMouseOver} onMouseOut={onMouseLeave}>
            <StyledSpan>{title}</StyledSpan>
            <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
            <StyledOverview>{slicedOverview}</StyledOverview>
            {
                hover ? <StyledHeart size="40px" title="Add to fav" onClick={onClick} $isFavourite={isFavourite} /> : null
            }
        </StyledMovieCard>
    );
});