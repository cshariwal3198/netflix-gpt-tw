import { createElement, memo, useCallback, useRef } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";
import { IconType } from "react-icons";
import { UserAccount } from "./account";

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
    const { toggleTheme } = useTheme();

    return (
        createElement(iconName, { onClick: toggleTheme, size: '26px', cursor: 'pointer' })
    )
})

export const Navbar = memo(({ onSearch }: { onSearch: (e) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const { theme } = useTheme();

    const onclick = useCallback(() => (inputRef.current?.focus), []);
    onSearch;

    return (
        <div className="flex justify-between h-20 shadow-md shadow-slate-700 mb-6 rounded-b-md">
            <div className="flex justify-around items-center w-1/2 text-xl">
                <img src="/images/neflix_logo.png" alt="Logo" className="w-40" />
                <div>Movies</div>
                <div>Favourites</div>
                <div>Rated</div>
                <div>TV Shows</div>
            </div>
            <div className="flex items-center justify-around text-xl w-1/4">
                <div className="flex items-center justify-around p-2 w-[30vw]">
                    {
                        theme === 'dark' ? <ThemeIcon iconName={FiSun} /> : <ThemeIcon iconName={LuMoonStar} />
                    }
                    <StyledInputWrapper>
                        <StyledIcon size='30px' onClick={onclick} />
                        <StyledInput ref={inputRef} />
                    </StyledInputWrapper>
                </div>
                <UserAccount />
            </div>
        </div>
    )
})