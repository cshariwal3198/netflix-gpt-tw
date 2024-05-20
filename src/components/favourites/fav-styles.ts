import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledFlex = styled.div<{ $isData: boolean }>`
    display: flex;
    overflow-x: auto;
    overflow-y: visible;
    justify-content: ${({ $isData }) => ($isData ? 'unset' : 'center')};
    padding-bottom: 30px;
`;

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
`;

export const StyledSpan = styled.span<{ $isSM: boolean }>`
    font-family: sans-serif;
    font-size: ${({ $isSM }) => ($isSM ? '18px' : '25px')};
    font-weight: 600;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: ${({ $isSM }) => ($isSM ? '10px' : '20px')};
    position: relative;
`;

export const StyledLink = styled(Link)`
    font-weight: 700;
    color: ${({ theme: { semanticColors: { linkTextColor } } }) => (linkTextColor)};;
`;