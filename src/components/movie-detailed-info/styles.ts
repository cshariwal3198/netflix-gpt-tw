import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";

export const StyledBackground = styled.img`
    position: fixed;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    z-index: -1;
    mask-image: linear-gradient(180deg, #0e0d0d 20%, #0000 100%);
`;

export const StyledGrid = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '350px auto')};
    column-gap: 30px;
    width: 100%; padding: 20px;
    row-gap: 20px;
`;

export const StyledInnerGrid = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '0.6fr 1fr')};
    column-gap: 30px;
    row-gap: 20px;
    width: 100%;
`;

export const StyledImage = styled.img<{ $isSM: boolean, $isMD: boolean }>`
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '30vh' : getValueBasedOnResolution($isMD, '40Vh', '50vh'))};
    min-width: ${({ $isSM, $isMD }) => ($isSM ? '180px' : getValueBasedOnResolution($isMD, '220px', '260px'))};;
    border-radius: 10px;
    box-shadow: 5px 0px 30px ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    justify-self: center;
    padding: 10px;
`;

export const StyledButton = styled.button<{ $isSM: boolean, $isMD: boolean, $isWishlisted?: boolean }>`
    display: grid;
    grid-template-columns: 20px auto;
    column-gap: 8px;
    min-width: ${({ $isSM, $isMD }) => ($isSM ? '80px' : getValueBasedOnResolution($isMD, '110px', '150px'))};
    max-width: fit-content; align-items: center;
    padding: 8px; border: 1px solid;
    font-size: ${({ $isSM, $isMD }) => ($isSM ? '20px' : getValueBasedOnResolution($isMD, 'large', 'x-large'))};
    border-radius: 7px;
    color: ${({ $isWishlisted }) => ($isWishlisted ? 'red' : 'auto')};

    > svg{
        fill: ${({ $isWishlisted }) => ($isWishlisted ? 'red' : 'auto')};
    }
`;

export const StyledFlex = styled.div`
    display: flex;
    column-gap: 20px;
    justify-content: start;
`;

export const StyledSimillarDiv = styled.div`
    display: flex;
    flex-wrap: nowrap;
    column-gap: 6px;
    overflow-x: auto;
    padding-left: 10px;
    overflow-y: hidden;
    min-height: 260px;
`;

export const StyledVideoItem = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: 1fr 40px;
    justify-content: space-around;
    width: 100%;
    padding: 12px;
    border: 1px solid;
    border-radius: 6px;
    margin-left: ${({ $isSM }) => ($isSM ? 0 : '10px')};
`;

export const VideosWrapper = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? '1fr' : '1fr 1fr')};
    row-gap: 20px;
    column-gap: 40px;
    padding: 10px;
`;

export const StyledPara = styled.p`
    text-decoration: dashed;
    cursor: pointer;
    color: ${({ theme: { semanticColors: { extendedTextColor } } }) => (extendedTextColor)};;
`;

export const StyledText = styled.span`
    text-decoration: none;
    color: ${({ theme: { semanticColors: { extendedTextColor } } }) => (extendedTextColor)};;
    font-weight: 500;
    cursor: pointer;
    font-size: 18px;
    margin-left: 0px;
`;