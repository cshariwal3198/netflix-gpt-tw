import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 100%;
    justify-content: start;
    padding: 10px;
`;

export const StyledFlexWrap = styled.div`
    display: flex;
    overflow: auto;
    padding-top: 4px;
    padding-bottom: 6px;
    overflow-y: hidden;
    min-height: 255px;
`;

export const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '45px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
`;