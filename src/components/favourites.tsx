import { memo, useCallback } from "react";
import { useGetFavourites } from "../hooks/use-get-favourites";
import { Card } from "./movie-card";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IMovie } from "../types";

const StyledFlex = styled.div<{ $isData: boolean }>`
    display: flex;
    justify-content: center;
    overflow: auto;
    column-gap: 25px;
    margin-top: 15px;
    padding-top: 10px;
    padding-bottom: 30px;
`;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
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

    const { favourites: { movie: favMovies, tvshow: favShows }, getIsFavourite } = useGetFavourites();

    const renderContent = useCallback((shows: IMovie[], type: 'movie' | 'tvshow') => (
        shows.map((item) => (
            <Card item={item} isFavourite={getIsFavourite(item.id, type)} key={item.id} canViewSimillar={false} canShowWishlist={false} />
        ))
    ), [getIsFavourite]);

    return (
        <StyledWrapper>
            <div className="h-[50%] p-5">
                <h1 className="ml-[4%] font-serif text-xl">Favourite Movies</h1>
                <StyledFlex $isData={!!favMovies.length}>
                    {
                        favMovies.length ? renderContent(favMovies, 'movie') :
                            <StyledSpan>
                                No favourite Movies
                                <StyledLink to="/categories">Add Movie To Favourites</StyledLink>
                            </StyledSpan>
                    }
                </StyledFlex>
            </div>
            <hr />
            <div>
                <h1 className="ml-[4%] font-serif text-xl">Favourite Shows</h1>
                <StyledFlex $isData={!!favShows.length}>
                    {
                        favShows.length ? renderContent(favShows, 'tvshow') :
                            <StyledSpan>
                                No favourite Shows
                                <StyledLink to="/tvshows">Add Shows To Favourites</StyledLink>
                            </StyledSpan>
                    }
                </StyledFlex>
            </div>
        </StyledWrapper>
    )
});

export default Favourites;