import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";

export const StyledMovieCard = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 10px;
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '225px' : getValueBasedOnResolution($isMD, '250px', '280px'))};
    max-width: ${({ $isSM, $isMD }) => ($isSM ? '160px' : getValueBasedOnResolution($isMD, '175px', '210px'))};
    min-width: 160px;
    position: relative;
    text-align: center;

    &:hover{
        transform: scale(1.1);
        transition: cubic-bezier(0.39, 0.575, 0.565, 1) 1.2s;
    }
`;

export const StyledImage = styled.img`
    height: 420px;
    opacity: 0.8;
    filter: contrast(0.8);
    -webkit-filter: brightness(0.8);
    border-radius: 8px;
`;

export const StyledSpan = styled.span`
    position: absolute;
    top: 15px;
    font-weight: 500;
    padding: 10px;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    transform: none;
`;

export const StyledOverview = styled(StyledSpan) <{ $hover: boolean, $isSM: boolean }>`
    bottom: 30px;
    top: unset;
    opacity: ${({ $hover }) => ($hover ? '0.7' : '0.1')};
    margin-left: 0px;
    font-weight: ${({ $isSM }) => ($isSM ? 400 : 500)};
    cursor: default;
`;