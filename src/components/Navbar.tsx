import { UserButton } from "@clerk/clerk-react";
import { createElement, memo } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuMoonStar } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useTheme } from "../contexts/theme-context";
import { IconType } from "react-icons";

const ThemeIcon = memo(({ iconName }: { iconName: IconType }) => {
    const { toggleTheme } = useTheme();

    return (
        createElement(iconName, { onClick: toggleTheme, size: '26px', cursor: 'pointer' })
    )
})

export const Navbar = memo(() => {

    const { theme } = useTheme();

    return (
        <div className="flex justify-between h-20 shadow-md shadow-slate-700 mb-6 rounded-b-md">
            <div className="flex justify-around items-center w-1/2 text-xl">
                <img src="/images/neflix_logo.png" alt="Logo" className="w-40" />
                <div>Movies</div>
                <div>Rated</div>
                <div>TV Shows</div>
            </div>
            <div className="flex items-center justify-around text-xl w-1/6">
                <div className="flex items-center justify-around p-2 w-60">
                    {
                        theme === 'dark' ? <ThemeIcon iconName={FiSun} /> : <ThemeIcon iconName={LuMoonStar} />
                    }
                    <IoIosSearch size='30px' />
                    {/* <input type="text" placeholder="Enter Here" className="bg-inherit text-xl ml-3" /> */}
                </div>
                <UserButton />
            </div>
        </div>
    )
})