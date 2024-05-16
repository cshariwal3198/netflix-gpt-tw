import { memo, useCallback, useMemo, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Card } from "./movie-card";
import styled from "styled-components";
import { RingLoader } from "react-spinners";
import { IMovie } from "../types";
import { useTheme } from "../contexts/theme-context";
import { useDisplaySizeGroup, useGetFavourites, useGetTvShowsBasedOnCategory, useTranslator } from "../hooks";
import { getValueBasedOnResolution } from "./utils";

const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ $isSM, $isMD }) => ($isSM ? '6px' : getValueBasedOnResolution($isMD, '10px', '13px'))};
    row-gap: ${({ $isSM, $isMD }) => ($isSM ? '12px' : getValueBasedOnResolution($isMD, '18px', '25px'))};
    margin-bottom: 30px;
`;

const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '40px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 10px;
    margin-left: 5%;
    margin-bottom: 10px;
`;

const StyledTab = styled(Tabs) <{ $theme: string }>`
    background-color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
    margin: 20px;
    border-radius: 8px;
    padding: 5px;
    transition: all 2s;
`;

const TvShows = memo(() => {

    const { popular, topRated, upcoming, trending } = useGetTvShowsBasedOnCategory();
    const [value, setValue] = useState(0);
    const { theme } = useTheme();
    const { getIsFavourite } = useGetFavourites();
    const { isMD, isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const tvShowsToRender = useMemo(() => ([
        { name: 'Popular', shows: popular, title: 'general.popular' },
        { name: 'Top Rated', shows: topRated, title: 'general.topRated' },
        { name: 'Trending', shows: trending, title: 'general.trending' },
        { name: 'upcoming', shows: upcoming, title: 'general.upcoming' },
    ]), [popular, topRated, trending, upcoming]);

    const handleChange = useCallback((e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    const renderShows = useCallback((index: number) => (
        <>
            <StyledSpan $isSM={isSM} $isMD={isMD}>{translate(tvShowsToRender[index].title)}</StyledSpan>
            <StyledWrapper $isSM={isSM} $isMD={isMD}>
                {
                    !tvShowsToRender[index].shows.length ?
                        <div className="flex h-[100%] w-full justify-center items-center">
                            <RingLoader color="#36d7b7" />
                        </div> :
                        tvShowsToRender[index].shows.map((item: IMovie) => (
                            <Card canViewSimillar={true} isFavourite={getIsFavourite(item.id, 'tvshow')} item={item} key={item.id} type="tvshow" />
                        ))
                }
            </StyledWrapper>
        </>
    ), [getIsFavourite, isMD, isSM, translate, tvShowsToRender]);

    const showContent = useMemo(() => renderShows(value), [renderShows, value]);

    const tabColor = useMemo(() => (
        theme === 'dark' ? 'black' : 'white'
    ), [theme]);

    return (
        <div>
            <StyledTab value={value} $theme={theme}>
                <Tab style={{ color: tabColor, fontSize: '18px' }} iconPosition="start" label="Popular" value={0} onClick={(e) => (handleChange(e, 0))} />
                <Tab style={{ color: tabColor, fontSize: '18px' }} iconPosition="end" label="Top Rated" value={1} onClick={(e) => (handleChange(e, 1))} />
                <Tab style={{ color: tabColor, fontSize: '18px' }} iconPosition="bottom" label="Trending" value={2} onClick={(e) => (handleChange(e, 2))} />
                <Tab style={{ color: tabColor, fontSize: '18px' }} iconPosition="bottom" label="UpComing" value={3} onClick={(e) => (handleChange(e, 3))} />
            </StyledTab>
            <div>
                {
                    showContent
                }
            </div>
        </div>
    );
});

export default TvShows;
