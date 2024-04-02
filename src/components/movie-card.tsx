import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IMovie } from "../types";
import { FaHeart } from 'react-icons/fa';

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

const StyledHeart = styled(FaHeart)`
    position: absolute;
    bottom: 20px;
    right: 30px;
    fill: #fffdfd;
`;

export const Card = memo(({ original_title, overview, poster_path, release_date, title, backdrop_path, id, addToFavourite, removeFromFavourite }: IMovie & { addToFavourite: (id: number) => void, removeFromFavourite: (id: number) => void }) => {

    const [hover, setHover] = useState<boolean>(false);

    const slicedOverview = useMemo(() => `${overview.slice(1, 100)}...`, [overview]);

    const onMouseOver = useCallback(() => (setHover(true)), []);

    const onMouseLeave = useCallback(() => (setHover(false)), []);

    const onClick: React.MouseEventHandler<SVGElement> = useCallback((e) => {
        let { fill } = e.target.style;
        if (!fill) {
            e.target.style.fill = 'red';
            addToFavourite(id);
        } else {
            e.target.style.fill = '';
            removeFromFavourite(id);
        }
    }, [addToFavourite, id, removeFromFavourite]);

    return (
        <StyledMovieCard onMouseOver={onMouseOver} onMouseOut={onMouseLeave}>
            <StyledSpan>{title}</StyledSpan>
            <StyledImage src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
            <StyledOverview>{slicedOverview}</StyledOverview>
            {
                hover ? <StyledHeart size="40px" title="Add to fav" onClick={onClick} /> : null
            }
        </StyledMovieCard>
    );
});