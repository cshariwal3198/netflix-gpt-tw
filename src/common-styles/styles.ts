import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

export const StyledHeart = styled(FaHeart) <{ $isFavourite: boolean }>`
    position: absolute;
    bottom: 20px;
    right: 30px;
    fill: ${({ $isFavourite }) => ($isFavourite ? 'red' : 'white')};
    cursor: pointer;
`;

export const StyledSpan = styled.h6`
    width: fit-content;
    padding: 5px;
    font-size: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background: none;
    border: 1px solid;
    border-radius: 8px;
    font: 300; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;