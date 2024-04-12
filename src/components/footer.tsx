import { memo } from "react";
import styled from "styled-components";

const StyledSpan = styled.span`
    text-align: center;
    font-size: xx-large;
    font-weight: 600;
`;

const StyledLine = styled.hr`
    border: 1px solid black;
`;

export const Footer = memo(() => {
    return (
        <>
            <StyledLine />
            <StyledSpan>Footer Content</StyledSpan>
            <span className="flex justify-center items-center">Created by CSH</span>
        </>
    );
})