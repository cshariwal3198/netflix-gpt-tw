import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

export const StyledFav = styled(FaHeart) <{ $isFavourite: boolean }>`
    /* position: absolute;
    bottom: 20px;
    right: 30px; */
    fill: ${({ $isFavourite }) => ($isFavourite ? 'red' : 'white')};
    cursor: pointer;
`;

export const Wrapper = styled.div<{ $isSM: boolean, $backdrop: string }>`
    display: grid;
    grid-template-columns: ${({ $isSM }) => ($isSM ? 'auto' : '1fr 2fr')};
    column-gap: 30px;
    border: 1px solid ${({ theme: { semanticColors: { movieDetailsWrapperBorder } } }) => (movieDetailsWrapperBorder)};;
    background: ${({ $backdrop }) => `url(${`https://image.tmdb.org/t/p/w500/${$backdrop}`}) no-repeat top center`};
    background-size: 100% 100%;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};

        &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(3, 3, 3, 0.5);
        z-index: 0;
        }   
`;

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%; width: 100%;
    padding: 15px;
    row-gap: 20px;
    position: relative;
    overflow: auto;
    margin-top: 10px;
    margin-bottom: 15px;
`;

export const StyledProd = styled.div`
    display: flex;
    min-height: 70px;
    justify-content: space-center;
    align-items: center;
    width: 100%;
    padding: 8px;
    column-gap: 8px;
    overflow-x: auto;
    overflow-y: hidden;
`;

export const StyledProdImage = styled.img`
    height: 35px;
`;

export const StyledLabel = styled.label`
    font-size: 20px;
    cursor: pointer;
    color: rgb(29 78 216);
    font-weight: 700;
`;