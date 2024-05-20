import { Modal } from "@material-ui/core";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
    background-color: #424242b8;
    z-index: 10;
`;

export const StyledPopup = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 75%;
    width: 80%;
    max-width: 1000px;
    border: 1px solid ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    border-radius: 8px; margin: auto;
    padding: ${({ $isSM }) => ($isSM ? '12px 5px 0px 5px' : '30px 20px 8px 20px')};
    align-items: center;
    overflow-y: auto;
    position: relative;
`;

export const StyledInput = styled.input`
    background: none;
    border: 1px solid ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    border-radius: 9px;
    font-size: 20px;
    padding: 10px;
    width: 85%;
    color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    padding-left: 5%;
`;

export const ContainerWrapper = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    padding: ${({ $isSM }) => ($isSM ? '0' : '10px 40px')};
`;

export const ResultContainer = styled.div<{ $alignCenter: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 350px;
    overflow-y: auto;
    justify-content: ${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
    align-items:${({ $alignCenter }) => ($alignCenter ? 'center' : 'unset')};
    padding: 20px;
    border-radius: 6px;
    box-shadow: inset -10px -8px 20px 0px #4b4b4d;
`;

export const RecentlyOpenedWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

export const CloseButton = styled.button`
    background: #dbdbdb;
    width: fit-content;
    border: 1px solid ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
    color: ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
    border-radius: 8px;
    padding: 5px 20px;
    font-size: 18px;
    align-self: end;
    position: sticky;
    bottom: 5px; right: 5px;
`;

export const MovieWrapper = styled.div`
    display: grid;
    grid-template-columns: 60px auto;
    column-gap: 20px;
    justify-content: start;
    align-items: center;
    padding: 5px 25px;
    border-radius: 7px;
    border: 1px solid grey;
`;

export const StyledImage = styled.img`
    height: 50px;
    width: 42px;
    border-radius: 8px;
`;