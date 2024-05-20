import styled from "styled-components";

export const StyledDiv = styled.div<{ $isSM: boolean }>`
    display: flex;
    flex-wrap: wrap;
    justify-content: ${({ $isSM }) => ($isSM ? 'center' : 'start')};
    column-gap: 20px;
    row-gap: 30px;
    width: 100%; height: 100%;
    align-items: center;
`;
