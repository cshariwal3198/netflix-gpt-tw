import { memo, useCallback } from "react";
import { StyledLine, FooterContainer, StyledSpan } from "./styles";
import { MediaAndLanguage } from "./language-media";
import { Link } from "react-router-dom";
import { useDisplaySizeGroup, useTranslator } from "../../hooks";

export const Footer = memo(() => {

    const { isSM } = useDisplaySizeGroup();
    const { translate } = useTranslator();

    const onHomeClick = useCallback(() => (
        window.scrollTo({
            top: 0, behavior: 'smooth'
        })
    ), []);

    return (
        <FooterContainer>
            <StyledLine />
            <MediaAndLanguage />
            <StyledLine />
            <StyledSpan>
                {translate('footer.aboutSiteMessage')}
            </StyledSpan>
            <div className={`flex justify-around items-center gap-[10px] text-[14px] font-medium ${isSM ? 'flex-wrap' : 'unset'}`}>
                <h6 className="cursor-pointer">
                    <Link to='/' onClick={onHomeClick}>{translate('general.home')}</Link>
                </h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/')}>{translate('footer.guide')}</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/')}>{translate('footer.documentation')}</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/community/team')}>{translate('footer.contact')}</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/blog')}>{translate('footer.blog')}</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://github.com/cshariwal3198')}>{translate('footer.about')}</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://img.freepik.com/free-vector/closed-sign-label_1046-9.jpg?size=626&ext=jpg')}>{translate('footer.help')}</h6>
            </div>
            <StyledSpan>© 2024 NetFlix GPT. TM</StyledSpan>
        </FooterContainer>
    );
})