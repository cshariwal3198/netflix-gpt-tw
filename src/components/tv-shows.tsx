import { memo, useCallback, useMemo, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useFetchTvShows } from "../hooks/fetch-tv-shows";
import { Card } from "./movie-card";
import styled from "styled-components";
import { RingLoader } from "react-spinners";
import { IMovie } from "../types";
import { useTheme } from "../contexts/theme-context";

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
`;

const StyledSpan = styled.span`
    font-size: 45px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const StyledTab = styled(Tabs) <{ $theme: string }>`
    background-color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
    margin: 20px;
    border-radius: 8px;
    padding: 5px;
`;

const TvShows = memo(() => {

    const { popular, topRated, trending } = useFetchTvShows();
    const [value, setValue] = useState(0);
    const { theme } = useTheme();

    const tvShowsToRender = useMemo(() => ([
        { name: 'Popular', showsData: popular }, { name: 'Top Rated', showsData: topRated }, { name: 'Trending', showsData: trending }
    ]), [popular, topRated, trending]);

    const handleChange = useCallback((e: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }, []);

    const renderShows = useCallback((index: number) => (
        <>
            <StyledSpan>{tvShowsToRender[index].name}</StyledSpan>
            <StyledWrapper>
                {
                    tvShowsToRender[index].showsData.isLoading ?
                        <div className="flex h-[100%] w-full justify-center items-center">
                            <RingLoader color="#36d7b7" />
                        </div> :
                        tvShowsToRender[index].showsData.data.results.map((item: IMovie) => (
                            <Card canViewSimillar={true} isFavourite={false} item={item} key={item.id} type="tvshow" />
                        ))
                }
            </StyledWrapper>
        </>
    ), [tvShowsToRender]);

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
