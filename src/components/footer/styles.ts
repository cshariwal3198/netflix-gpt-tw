import styled from "styled-components";

export const StyledSpan = styled.span`
    text-align: center;
    font-size: 13px;
    font-weight: 400;
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 20px 40px;
    margin-top: 60px;
`;

export const StyledDiv = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : 'auto auto')};
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const StyledLine = styled.hr`
    border: 1px solid black;
`;

export const LanguageWrapper = styled.div`
    display: grid;
    grid-template-columns: auto 150px;
    position: relative;
    gap: 20px;
    font-size: 18px;
    justify-content: center;
    align-items: center;
`;

export const FlyoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 0px 7px;
`;
