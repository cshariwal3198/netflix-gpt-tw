import { ChangeEvent, memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const FlyoutWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
    background-color: aliceblue;
    color: black;
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

export const LanguageFlyout = memo(({ languages, defaulSelectedLanguage }: { languages: { name: string, code: string }[], defaulSelectedLanguage: string }) => {

    const { i18n } = useTranslation('app');

    const onLocaleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const { code } = languages.find(({ name }) => (e.target.value === name))!;
        localStorage.setItem('locale', code);
        i18n.changeLanguage(code);
    }, [i18n, languages]);

    const renderLanguageDropdown = useCallback(() => (
        languages.map(({ name }) => (
            <StyledOption key={name} value={name}>{name}</StyledOption>
        ))
    ), [languages]);

    return (
        <FlyoutWrapper>
            <StyledSelect name="languages" id="languages" onChange={onLocaleChange} defaultValue={defaulSelectedLanguage}>
                {renderLanguageDropdown()}
            </StyledSelect>
        </FlyoutWrapper>
    );
});
