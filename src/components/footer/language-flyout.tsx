import { memo, useCallback } from "react";
import styled from "styled-components";

const FlyoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    background-color: aliceblue;
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
`;

const StyledSelect = styled.select`
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    padding: 0px 10px;
    cursor: pointer;
`;

const StyledOption = styled.option`
    padding: 0px 10px;
    transition: 0.5s;
`;

export const LanguageFlyout = memo(({ languages }: { languages: string[] }) => {

    const renderLanguageDropdown = useCallback(() => (
        languages.map((language) => (
            <StyledOption key={language} value={language}>{language}</StyledOption>
        ))
    ), [languages]);

    return (
        <FlyoutWrapper>
            <StyledSelect name="languages" id="languages">
                {renderLanguageDropdown()}
            </StyledSelect>
        </FlyoutWrapper>
    );
});
