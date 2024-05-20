import styled from "styled-components";
import { getValueBasedOnResolution } from "../utils";

export const StyledWrapper = styled.div<{ $isSM: boolean, $isMD: boolean }>`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: ${({ $isSM, $isMD }) => ($isSM ? '40vh' : getValueBasedOnResolution($isMD, '60vh', '75vh'))};
    text-align: center;
    margin-top: 8px;
    border: 1px solid ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    border-radius: 10px;
`;

export const StyledPoster = styled.img<{ $isSM: boolean, $isMD: boolean }>`
    max-height: ${({ $isSM, $isMD }) => ($isSM ? '20vh' : getValueBasedOnResolution($isMD, '30vh', '40vh'))};
    position: absolute;
    z-index: 2;
    bottom: -30px;
    right: ${({ $isSM }) => ($isSM ? '5%' : '8%')};
    border-radius: 20px;
    box-shadow: 10px 12px 10px 0px ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
`;

export const StyledSpan = styled.span`
    position: absolute;
    padding: 20px;
    top: 20px;
    left: 30px;
    font-weight: 600;
    font-size: x-large;
    font-family: serif;
    font-style: italic;
`;

export const TitleWrapper = styled.p <{ $isMD: boolean, $isSM: boolean }>`
    font-weight: ${({ $isMD, $isSM }) => ($isSM ? '600' : getValueBasedOnResolution($isMD, '600', '700'))};
    font-size: ${({ $isMD, $isSM }) => ($isSM ? '1.5rem' : getValueBasedOnResolution($isMD, '2rem', '2.5rem'))};
    z-index: 2;
    font-family: serif;
`;

export const ReleaseDateWrapper = styled(StyledSpan)`
    left: unset;
    top: 30px;
    right: 3%;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    font-size: 24px;
`;

export const StyledPara = styled.p <{ $isMD: boolean, $isSM: boolean }>`
    font-family: serif;
    font-weight: 300;
    font-size: ${({ $isMD, $isSM }) => ($isSM ? '18px' : getValueBasedOnResolution($isMD, '21px', '24px'))};
    z-index: 3;
    width: ${({ $isMD, $isSM }) => ($isSM ? '60%' : getValueBasedOnResolution($isMD, '70%', '70%'))};
`;

export const ButtonWrapper = styled.div<{ $isSM: boolean }>`
    display: ${({ $isSM }) => ($isSM ? 'grid' : 'flex')};
    width: 40%;
    left: 4%; bottom: ${({ $isSM }) => ($isSM ? '50px' : '30px')};
    position: absolute;
    gap: 20px; z-index: 10;
`;

export const StyledIframe = styled.iframe`
    border-radius: 10px;
    z-index: -1;
    opacity: 0.7;
`;