import { createElement, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";
import { IconType } from "react-icons";
import { UserAccount } from "./account";
import { Link, useNavigate } from "react-router-dom";

const StyledInputWrapper = styled.div`
    display: flex;
    column-gap: 5px;
    justify-content: center;
`;

const StyledIcon = styled(IoIosSearch)`
    cursor: pointer;
`;

const StyledInput = styled.input`
    width: 10vw;
    background: none;
    border: none;
`;

const ThemeIcon = memo(({ iconName }: { iconName: IconType }) => {
    const { toggleTheme, theme } = useTheme();

    const onClick = useCallback(() => {
        localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
        toggleTheme();
    }, [theme, toggleTheme]);

    return (
        createElement(iconName, { onClick, size: '26px', cursor: 'pointer' })
    )
})

export const Navbar = memo(({ onSearch }: { onSearch: (e: any) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const { theme } = useTheme();
    const navigate = useNavigate();

    const onclick = useCallback(() => (inputRef.current?.focus), []);
    onSearch;

    const onLogoClick = useCallback(() => navigate('/'), [navigate]);

    return (
        <div className="flex justify-between h-20 shadow-md shadow-slate-700 rounded-b-md">
            <div className="flex justify-around items-center w-1/2 text-xl">
                <img src="/images/neflix_logo.png" alt="Logo" className="w-40 cursor-pointer" onClick={onLogoClick} />
                <Link to="/categories">Movies</Link>
                <div>TV Shows</div>
                <Link to="/favourites">Favourites</Link>
            </div>
            <div className="flex items-center justify-around text-xl w-1/4">
                {
                    theme === 'dark' ? <ThemeIcon iconName={FiSun} /> : <ThemeIcon iconName={LuMoonStar} />
                }
                <StyledInputWrapper>
                    <StyledIcon size='30px' onClick={onclick} />
                    <StyledInput ref={inputRef} />
                </StyledInputWrapper>
                <UserAccount />
            </div>
        </div>
    )
})