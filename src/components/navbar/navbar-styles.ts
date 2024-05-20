import { CgClose, CgMenu } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import styled from "styled-components";

export const StyledNavWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding-right: 10px; padding-left: 10px;
    padding-top: 5px; padding-bottom: 5px;
    align-items: center;
    width: 100%;
`;

export const StyledInputWrapper = styled.div`
    display: flex;
    column-gap: 5px;
    justify-content: center;
`;

export const StyledIcon = styled(IoIosSearch)`
    cursor: pointer;
`;

export const StyledOpenMenuIcon = styled(CgMenu)`
    cursor: pointer;
`;

export const StyledCloseMenuIcon = styled(CgClose)`
    cursor: pointer;
`;

export const StyledMiniWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px;
    row-gap: 10px;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    width: 100%;
`;

export const StyledMainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0px 20px 20px 0px ${({ theme: { semanticColors: { navbarShadowColor } } }) => (navbarShadowColor)};;
`;

export const StyledSearchInput = styled.button`
    background: none;
    border: 1px solid;
    text-align: center;
    height: 40px; width: 100%;
    border-radius: 5px;
    opacity: 0.7;
`;