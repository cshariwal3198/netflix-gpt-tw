import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";
import Tabs from '@mui/material/Tabs'

export const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ $isSM, $isMD }) => ($isSM ? '6px' : getValueBasedOnResolution($isMD, '10px', '13px'))};
    row-gap: ${({ $isSM, $isMD }) => ($isSM ? '12px' : getValueBasedOnResolution($isMD, '18px', '25px'))};
    margin-bottom: 30px;
`;

export const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '40px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-top: 10px;
    margin-left: 5%;
    margin-bottom: 10px;
`;

export const StyledTab = styled(Tabs) <{ $theme: string }>`
    background-color: ${({ $theme }) => ($theme === 'dark' ? 'white' : 'black')};
    margin: 20px;
    border-radius: 8px;
    padding: 5px;
    transition: all 2s;
`;