import { memo } from "react";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { Card } from "./movie-card";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledFlex = styled.div<{ $isDataAvailable: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 25px;
    column-gap: 25px;
    margin-top: 15px;
    height: ${({ $isDataAvailable }) => ($isDataAvailable ? 'unset' : '100%')};
`;

const StyledSpan = styled.span`
    font-family: sans-serif;
    font-size: 25px;
    font-weight: 600;
    font-size: larger;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 30px;
`;

const StyledLink = styled(Link)`
    font-size: 25px;
    font-weight: 700;
    color: #118bf7;
`;

const Favourites = memo(() => {

    const { favourites } = useGetFavourites();

    return (
        <StyledFlex $isDataAvailable={Boolean(favourites.length)}>
            {
                favourites.length ? favourites.map((item) => (
                    <Card item={item} isFavourite={true} key={item.id} canViewSimillar={false} />
                )) :
                    <StyledSpan>
                        No favourites
                        <StyledLink to="/">Add Movie To Favourites</StyledLink>
                    </StyledSpan>
            }
        </StyledFlex>
    )
});

export default Favourites;