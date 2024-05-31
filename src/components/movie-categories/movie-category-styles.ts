import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";

export const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: ${({ $isSM, $isMD }) => ($isSM ? '6px' : getValueBasedOnResolution($isMD, '10px', '13px'))};
    row-gap: ${({ $isSM, $isMD }) => ($isSM ? '15px' : getValueBasedOnResolution($isMD, '16px', '20px'))};
    margin-bottom: 30px;
`;

export const StyledSpan = styled.span<{ $isSM: boolean, $isMD: boolean }>`
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '22px' : getValueBasedOnResolution($isMD, '32px', '45px'))};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
    font-style: italic;
    margin-left: 3%;
    margin-top: 10px;
    margin-bottom: 10px;
`;