import { memo } from "react";
import { StyledLine, FooterContainer, StyledSpan } from "./styles";
import { MediaAndLanguage } from "./language-media";
import { Link } from "react-router-dom";
import { useDisplaySizeGroup } from "../../hooks";

export const Footer = memo(() => {

    const { isSM } = useDisplaySizeGroup();

    return (
        <FooterContainer>
            <StyledLine />
            <MediaAndLanguage />
            <StyledLine />
            <StyledSpan>
                React is a library. It lets you put components together, but it doesn’t prescribe how to do routing and data fetching.
                To build an entire app with React, we recommend a full-stack React framework like Next.js or Remix.
            </StyledSpan>
            <div className={`flex justify-around items-center gap-[10px] text-[14px] font-medium ${isSM ? 'flex-wrap' : 'unset'}`}>
                <h6 className="cursor-pointer">
                    <Link to='/'>Home</Link>
                </h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/')}>Guide</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/')}>Documentation</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/community/team')}>Contact</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://react.dev/blog')}>Blog</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://github.com/cshariwal3198')}>About</h6>
                <h6 className="cursor-pointer" onClick={() => window.open('https://img.freepik.com/free-vector/closed-sign-label_1046-9.jpg?size=626&ext=jpg')}>Help</h6>
            </div>
            <StyledSpan>© 2024 NetFlix GPT. TM</StyledSpan>
        </FooterContainer>
    );
})