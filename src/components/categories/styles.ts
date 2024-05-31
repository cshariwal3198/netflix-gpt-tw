import styled from "styled-components";

export const CategoryWrapper = styled.div<{ $isSM: boolean }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '220px auto')};
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export const ListContainer = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: ${({ $isSM }) => ($isSM ? 'row' : 'column')};
    gap: ${({ $isSM }) => ($isSM ? '20px' : '10px')};
    flex-wrap: wrap;
    background-color:  ${({ theme: { semanticColors: { categoryListBackgroundColor } } }) => (categoryListBackgroundColor)};
    height: 100%;
    max-height: ${({ $isSM }) => ($isSM ? '170px' : 'auto')};
    padding: ${({ $isSM }) => ($isSM ? '8px 10px' : '20px 20px')};
    box-sizing: border-box;
    row-gap: ${({ $isSM }) => ($isSM ? '8px' : '20px')};
    border-right: ${({ $isSM }) => ($isSM ? 'unset' : '1px solid white')};
    border-bottom: ${({ $isSM }) => ($isSM ? '1px solid white' : 'unset')};
    border-radius: ${({ $isSM }) => ($isSM ? '0px 0px 8px 8px' : '0px 8px 8px 0px')};
`;

export const ContainerWrapper = styled.div`
    transition: height 0.3s ease, opacity 0.3s ease;
`;

export const ListItem = styled.h6<{ $isActive: boolean, $isSM: boolean }>`
    text-align: center;
    font-size: ${({ $isSM }) => ($isSM ? '19px' : '22px')};
    width: ${({ $isSM }) => ($isSM ? 'fit-content' : '100%')};
    cursor: pointer;
    color: ${({ $isActive, theme: { semanticColors: { linkTextColor } } }) => ($isActive ? linkTextColor : 'white')};
`;

export const ContentWrapper = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    padding: ${({ $isSM }) => ($isSM ? '10px' : '20px')};
    justify-content: center;
    gap: ${({ $isSM }) => ($isSM ? '10px' : '30px')};
    overflow: auto;
`;