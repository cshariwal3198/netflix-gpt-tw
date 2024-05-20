import styled from "styled-components";

export const StyledWrapper = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '1fr 1fr')};
    gap: 10px;
    padding: 10px;
    justify-items: center;
`;

export const StyledImage = styled.img`
    height: 60px;
    width: 60px;
    border-radius: 50%;
    opacity: 0.8;
    filter: contrast(90%);
    mask-image: linear-gradient(rgba(0, 0, 0, 527),rgba(0, 0, 0, 5));
    border: 1px solid ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    margin-left: 10px;
`;

export const CreditWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    height: 70px;
    font-size: 14px;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    overflow: hidden;
    border: 1px solid ${({ theme: { semanticColors: { creditWrapperBorderColor } } }) => (creditWrapperBorderColor)};;
    border-radius: 7px;
    max-width: 500px;
`;

export const StyledText = styled.h6`
    word-break: break-all;
    font-size: 15px;
    word-wrap: unset;
    margin-left: 0px;
    text-align: center;
`;