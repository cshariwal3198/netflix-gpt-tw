import { ChangeEventHandler, SyntheticEvent, memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { IMovie } from "../types";
import { useDisplaySizeGroup, useGetMoviesBasedOnCategory, useGetTvShowsBasedOnCategory, useTranslator } from "../hooks";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addRecentlyOpenedShows, clearRecentlyOpenedShows } from "../store/recently-opened-slice";
import { IoCloseOutline } from "react-icons/io5";

const StyledModal = styled(Modal)`
    background-color: #424242b8;
    z-index: 10;
`;

const StyledPopup = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 75%;
    width: 80%;
    max-width: 1000px;
    border: 1px solid white;
    border-radius: 12px; margin: auto;
    padding: ${({ $isSM }) => ($isSM ? '12px 5px 0px 5px' : '30px 20px 8px 20px')};
    align-items: center;
    overflow-y: auto;
    position: relative;
`;

const StyledInput = styled.input`
    background: none;
    border: 1px solid white;
    border-radius: 9px;
    font-size: 20px;
    padding: 10px;
    width: 85%;
    color: white;
    padding-left: 5%;
`;

const ContainerWrapper = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    padding: ${({ $isSM }) => ($isSM ? '0' : '10px 40px')};
`;

const ResultContainer = styled.div<{ $alignCenter: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 350px;
    overflow-y: auto;
    justify-content: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
    align-items:${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
    padding: 20px;
    border-radius: 6px;
    box-shadow: inset -10px -8px 20px 0px;
`;

const RecentlyOpenedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const CloseButton = styled.button`
    background: #dbdbdb;
    width: fit-content;
    border: 1px solid black;
    color: black;
    border-radius: 8px;
    padding: 5px 20px;
    font-size: 18px;
    align-self: end;
    position: sticky;
    bottom: 5px; right: 5px;
`;

const MovieWrapper = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    column-gap: 20px;
    justify-content: start;
    align-items: center;
    padding: 5px 25px;
    border-radius: 7px;
    border: 1px solid grey;
`;

const StyledImage = styled.img`
    height: 50px;
    width: 42px;
    border-radius: 8px;
`;

export const SearchPopup = memo(({ setOpenPopup }: { setOpenPopup: any }) => {

    const [searchResult, setSearchResult] = useState<IMovie[]>([]);
    const { topRated: topRatedMovies, popular: popularMovies, upcoming: upComingMovies } = useGetMoviesBasedOnCategory();
    const { popular: popularShows, topRated: topRatedShows } = useGetTvShowsBasedOnCategory();

    const dispatch = useDispatch();
    const recentlyOpened: { recentlyOpenedShows: IMovie[] } = useSelector((state: any) => (state.recentlyOpened));
    const { isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const allShows = useMemo(() => (
        [...popularShows, ...topRatedShows, ...popularMovies, ...topRatedMovies, ...upComingMovies]
    ), [popularMovies, popularShows, topRatedMovies, topRatedShows, upComingMovies]);

    const closePopup = useCallback(() => (setOpenPopup(false)), [setOpenPopup]);

    const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const trimmedValue = e.target.value.trim().toLowerCase();
        if (trimmedValue) {
            setSearchResult(allShows.filter(({ title, original_title, name }) => (
                ((title && title.toLowerCase().includes(trimmedValue)) || (original_title && original_title.toLowerCase().includes(trimmedValue))
                    || (name && name.toLowerCase().includes(trimmedValue)))
            )))
        } else {
            setSearchResult([]);
        }
    }, [allShows]);

    const onMovieClick = useCallback((item: IMovie) => {
        closePopup();
        dispatch(addRecentlyOpenedShows(item))
    }, [closePopup, dispatch]);

    const onModalClick = useCallback((e: SyntheticEvent) => {
        if (e.target === e.currentTarget) {
            closePopup();
        }
    }, [closePopup]);

    const renderSearchResult = useCallback(() => (
        searchResult.length ?
            searchResult.map((item) => (
                <Link to={`/movie/${item.id}`} key={item.id}>
                    <MovieWrapper onClick={() => onMovieClick(item)}>
                        <StyledImage src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={translate('general.noImage')} />
                        <h6 className="font-mono text-[16px]">{item.title || item.name}</h6>
                    </MovieWrapper>
                </Link>
            )) :
            <h6>
                {translate('searchPopup.searchResultsComesHere')}
            </h6>
    ), [onMovieClick, searchResult, translate]);

    const renderRecentlyOpened = useCallback(() => (
        <RecentlyOpenedWrapper>
            {recentlyOpened.recentlyOpenedShows.map(({ poster_path, title, id, name }) => (
                <Link to={`/movie/${id}`} key={id}>
                    <div className="flex flex-col gap-[3px] w-[65px] overflow-hidden" onClick={closePopup}>
                        <img key={id} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="no image" height="75px" width="62px" style={{ borderRadius: '9px' }} />
                        <h6 className="text-[12px]">{title || name}</h6>
                    </div>
                </Link>
            ))}
        </RecentlyOpenedWrapper>
    ), [closePopup, recentlyOpened.recentlyOpenedShows]);

    const clearSearch = useCallback(() => (dispatch(clearRecentlyOpenedShows())), [dispatch]);
    const clearText = useMemo(() => (translate('general.clear')), [translate]);

    return (
        <StyledModal open={true}>
            <div className="flex flex-col justify-center items-center w-full h-full text-white" onClick={onModalClick}>
                <StyledPopup $isSM={isSM}>
                    <StyledInput placeholder={`${translate('general.search')}...`} onChange={onChange} />
                    <ContainerWrapper $isSM={isSM}>
                        <h5 className="font-serif font-normal text-[22px]">{translate('searchPopup.searchResults')}</h5>
                        <ResultContainer $alignCenter={false}>
                            {renderSearchResult()}
                        </ResultContainer>
                    </ContainerWrapper>
                    <ContainerWrapper $isSM={isSM}>
                        <div className="flex w-full justify-between items-center">
                            <h6 className="font-serif font-normal text-[22px]">{translate('searchPopup.recentlyOpened')}</h6>
                            {
                                recentlyOpened.recentlyOpenedShows.length ? (
                                    <div className="flex gap-[2px] items-center cursor-pointer border rounded-md p-[3px] max-h-[30px] bg-white text-black hover:text-red-600" onClick={clearSearch}>
                                        <IoCloseOutline size="22px" />
                                        <h6>{isSM ? `${clearText}` : `${clearText} ${translate('general.search')}`}</h6>
                                    </div>
                                ) : null
                            }
                        </div>
                        {renderRecentlyOpened()}
                    </ContainerWrapper>
                    <CloseButton onClick={closePopup}>
                        {translate('searchPopup.clickToClose')}
                    </CloseButton>
                </StyledPopup>
            </div>
        </StyledModal>
    )
});
