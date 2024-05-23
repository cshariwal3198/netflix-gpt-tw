import { ChangeEventHandler, SyntheticEvent, memo, useCallback, useMemo, useState } from "react";
import { IMovie } from "../../types";
import { useDisplaySizeGroup, useTranslator } from "../../hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addRecentlyOpenedShows, clearRecentlyOpenedShows } from "../../store/recently-opened-slice";
import { IoCloseOutline } from "react-icons/io5";
import { CloseButton, ContainerWrapper, MovieWrapper, RecentlyOpenedWrapper, ResultContainer, StyledImage, StyledInput, StyledModal, StyledPopup } from "./search-styles";
import { useStoreSelectors } from "../../store";

type IAllShow = IMovie & { showType: string };

export const SearchPopup = memo(({ setOpenPopup }: { setOpenPopup: any }) => {

    const dispatch = useDispatch();
    const { selectRecentlyOpenedShows, selectMoviesBasedOnCategory, selectTvShowsBasedOnCategory } = useStoreSelectors();
    const { isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();
    const [searchResult, setSearchResult] = useState<IAllShow[]>([]);

    const { topRated: topRatedMovies, popular: popularMovies, upcoming: upComingMovies, nowPlaying: nowPlayingMovies } = selectMoviesBasedOnCategory;
    const { popular: popularShows, topRated: topRatedShows, trending: trendingShows, upcoming: upcomingShows } = selectTvShowsBasedOnCategory;

    const { recentlyOpenedShows } = selectRecentlyOpenedShows;

    const allShows: IAllShow[] = useMemo(() => {

        const filteredMovies: IAllShow[] = [];
        const filteredTvShows: IAllShow[] = [];

        [...topRatedMovies, ...popularMovies, ...upComingMovies, ...nowPlayingMovies].forEach((item) => {
            if (!filteredMovies.find(({ id: movieId }) => (movieId === item.id))) {
                filteredMovies.push({ ...item, showType: 'movie' });
            }
        });

        [...popularShows, ...topRatedShows, ...trendingShows, ...upcomingShows].forEach((item) => {
            if (!filteredTvShows.find(({ id }) => (id === item.id))) {
                filteredTvShows.push({ ...item, showType: 'tvshow' });
            }
        });

        return [...filteredMovies, ...filteredTvShows]
    }, [popularMovies, popularShows, topRatedMovies, topRatedShows, trendingShows, upComingMovies, upcomingShows, nowPlayingMovies]);

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
                <Link to={`/${item.showType}/${item.id}`} key={`${item.id} ${item.name}`}>
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
            {recentlyOpenedShows.map(({ poster_path, title, id, name }) => (
                <Link to={`/movie/${id}`} key={id}>
                    <div className="flex flex-col gap-[3px] w-[65px] overflow-hidden" onClick={closePopup}>
                        <img key={id} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="no image" height="75px" width="62px" style={{ borderRadius: '9px' }} />
                        <h6 className="text-[12px]">{title || name}</h6>
                    </div>
                </Link>
            ))}
        </RecentlyOpenedWrapper>
    ), [closePopup, recentlyOpenedShows]);

    const clearSearch = useCallback(() => (dispatch(clearRecentlyOpenedShows())), [dispatch]);
    const clearText = useMemo(() => (translate('general.clear')), [translate]);

    return (
        <StyledModal open={true}>
            <div role="none" className="flex flex-col justify-center items-center w-full h-full text-white" onClick={onModalClick}>
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
                                recentlyOpenedShows.length ? (
                                    <div role="none" className="flex gap-[2px] items-center cursor-pointer border rounded-md p-[3px] max-h-[30px] bg-white text-black hover:text-red-600" onClick={clearSearch}>
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
