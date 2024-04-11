import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

export const StyledHeart = styled(FaHeart) <{ $isFavourite: boolean }>`
    position: absolute;
    bottom: 20px;
    right: 30px;
    fill: ${({ $isFavourite }) => ($isFavourite ? 'red' : 'white')};
    cursor: pointer;
`;