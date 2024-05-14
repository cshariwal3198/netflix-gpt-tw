import { memo, useCallback } from "react";
import { LanguageWrapper, StyledDiv } from "./styles";
import { TfiWorld } from "react-icons/tfi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";
import FlyoutMenu from "./flyout";
import { useDisplaySizeGroup } from "../../hooks";

const languages = [
    ["Hindi", "/"],
    ["French", "/"],
    ["Spanish", "/"],
    ["Kannada", "/"]
];

export const MediaAndLanguage = memo(() => {

    const { isSM } = useDisplaySizeGroup();

    const renderMediaAccounts = useCallback(() => (
        <div className="flex gap-[15px] w-fit justify-center self-center">
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
                <h4>Language:</h4>
            </div>
            <FlyoutMenu linksArray={languages} />
        </LanguageWrapper>
    ), []);

    return (
        <StyledDiv $isSM={isSM}>
            {renderLanguageBlock()}
            {renderMediaAccounts()}
        </StyledDiv>
    );
});
