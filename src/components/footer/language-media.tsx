import { memo, useCallback, useMemo } from "react";
import { LanguageWrapper, StyledDiv } from "./styles";
import { TfiWorld } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import { useDisplaySizeGroup } from "../../hooks";
import { LanguageFlyout } from "./language-flyout";

const languages = [
    { name: "English", code: 'en' },
    { name: "Hindi", code: 'hi' },
    { name: "French", code: 'fr' },
    { name: "Spanish", code: 'es' }
];

export const MediaAndLanguage = memo(() => {

    const { isSM } = useDisplaySizeGroup();

    const defaulSelectedLanguage = useMemo(() => (
        languages.find(({ code }) => (code === localStorage.getItem('locale')))?.name || 'English'
    ), []);

    const renderMediaAccounts = useCallback(() => (
        <div className="flex gap-[15px] justify-center self-center w-full">
            <FaGithub size="25px" cursor="pointer" onClick={() => window.open('https://github.com/')} />
            <FaXTwitter size="25px" cursor="pointer" onClick={() => window.open('https://twitter.com/')} />
            <FaInstagramSquare size="25px" cursor="pointer" onClick={() => window.open('https://instagram.com/')} />
            <FaYoutube size="25px" cursor="pointer" onClick={() => window.open('https://youtube.com/')} />
            <FaLinkedin size="25px" cursor="pointer" onClick={() => window.open('https://linkedin.com/')} />
        </div>
    ), []);

    const renderLanguageBlock = useCallback(() => (
        <LanguageWrapper>
            <div className="flex gap-[8px] items-center">
                <TfiWorld />
                <h4>Language: </h4>
            </div>
            <LanguageFlyout languages={languages} defaulSelectedLanguage={defaulSelectedLanguage} />
        </LanguageWrapper>
    ), [defaulSelectedLanguage]);

    return (
        <StyledDiv $isSM={isSM}>
            {renderLanguageBlock()}
            {renderMediaAccounts()}
        </StyledDiv>
    );
});
