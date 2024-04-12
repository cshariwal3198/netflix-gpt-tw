import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

export const StyledHeart = styled(FaHeart) <{ $isFavourite: boolean }>`
    position: absolute;
    bottom: 20px;
    right: 30px;
    fill: ${({ $isFavourite }) => ($isFavourite ? 'red' : 'white')};
    cursor: pointer;
`;

export const StyledSpan = styled.span`
    width: fit-content;
    padding: 10px;
    font-size: 25px;
    padding-left: 15px;
    padding-right: 15px;
    background: none;
    border: 1px solid;
    border-radius: 15px;
    font: 500; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;