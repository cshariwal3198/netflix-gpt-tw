import { createElement, memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";
import { IconType } from "react-icons";
import { UserAccount } from "./account";
import { Link, useNavigate } from "react-router-dom";
import { useDisplaySizeGroup, useTranslator } from "../hooks";
import { CgMenu, CgClose } from "react-icons/cg";
import { SearchPopup } from "./search-popup";

const StyledNavWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    padding-right: 10px; padding-left: 10px;
    padding-top: 5px; padding-bottom: 5px;
    align-items: center;
    width: 100%;
`;

const StyledInputWrapper = styled.div`
    display: flex;
    column-gap: 5px;
    justify-content: center;
`;

const StyledIcon = styled(IoIosSearch)`
    cursor: pointer;
`;

const StyledOpenMenuIcon = styled(CgMenu)`
    cursor: pointer;
`;

const StyledCloseMenuIcon = styled(CgClose)`
    cursor: pointer;
`;

const StyledMiniWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px;
    row-gap: 10px;
    justify-content: space-around;
    justify-items: center;
    align-items: center;
    width: 100%;
`;

const StyledMainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    box-shadow: 0px 20px 20px 0px #4d4b4b;
`;

const StyledSearchInput = styled.button`
    background: none;
    border: 1px solid;
    text-align: center;
    height: 40px; width: 100%;
    border-radius: 5px;
    opacity: 0.7;
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

export const Navbar = memo(() => {

    const { isSM, isMD, isLG } = useDisplaySizeGroup();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [openPopup, setOpenPopup] = useState<boolean>(false);
    const { translate } = useTranslator();

    const { theme } = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (isMD || isLG) {
            setIsCollapsed(false);
        }
    }, [isLG, isMD]);

    const onclick = useCallback(() => (setOpenPopup(true)), []);

    const onLogoClick = useCallback(() => navigate('/'), [navigate]);

    const onMenuClick = useCallback(() => (setIsCollapsed(!isCollapsed)), [isCollapsed]);

    const onClickLink = useCallback(() => {
        if (isSM) {
            setIsCollapsed(false);
        }
    }, [isSM]);

    const renderSearchBlock = useCallback(() => (
        <StyledInputWrapper>
            <StyledIcon size='30px' onClick={onclick} />
        </StyledInputWrapper>
    ), [onclick]);

    const renderMenuItems = useCallback(() => (
        <>
            <Link to="/categories" onClick={onClickLink}>{translate('general.movies')}</Link>
            <Link to="/tvshows" onClick={onClickLink}>{translate('general.tvShows')}</Link>
            <Link to="/favourites" onClick={onClickLink}>{translate('general.myList')}</Link>
        </>
    ), [onClickLink, translate]);

    const renderThemeIcons = useCallback(() => (
        theme === 'dark' ? <ThemeIcon iconName={FiSun} /> : <ThemeIcon iconName={LuMoonStar} />
    ), [theme]);

    const renderLogo = useMemo(() => (
        <img src={`${import.meta.env.VITE_PUBLIC_URL}assets/neflix_logo.png`} alt="Logo" className="w-40 cursor-pointer" onClick={onLogoClick} title={translate('general.home')} />
    ), [onLogoClick, translate]);

    return (
        <StyledMainWrapper>
            <StyledNavWrapper>
                {
                    isSM ?
                        <div className="flex flex-col gap-[10px] justify-center">
                            <StyledMiniWrapper>
                                {renderLogo}
                                {
                                    isCollapsed ? <StyledCloseMenuIcon size="35px" onClick={onMenuClick} /> : <StyledOpenMenuIcon size="35px" onClick={onMenuClick} />
                                }
                                <UserAccount />
                            </StyledMiniWrapper>
                            <StyledSearchInput onClick={() => (setOpenPopup(true))}>{translate('searchPopup.searchAShow')}</StyledSearchInput>
                        </div>
                        :
                        <>
                            <div className="flex justify-around items-center md:w-[70%] text-2xl">
                                {renderLogo}
                                {renderMenuItems()}
                            </div>
                            <div className="flex items-center justify-around text-xl w-1/4">
                                {
                                    renderThemeIcons()
                                }
                                {
                                    isSM ? null : renderSearchBlock()
                                }
                                <UserAccount />
                            </div>
                        </>
                }
            </StyledNavWrapper>
            {
                isCollapsed ?
                    <div className="grid grid-cols-2 gap-[18px] justify-center items-center text-xl transition-all w-[100%] justify-items-center">
                        {renderMenuItems()}
                        {renderThemeIcons()}
                    </div> : null
            }
            {
                openPopup ? <SearchPopup setOpenPopup={setOpenPopup} /> : null
            }
        </StyledMainWrapper>
    )
})