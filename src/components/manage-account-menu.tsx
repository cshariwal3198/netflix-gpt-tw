import { memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import { UserProfile } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { GrClose } from "react-icons/gr";
import { useTheme } from "../contexts/theme-context";

const StyledAccountWrapper = styled.div`
    display: grid;
    grid-template-columns: auto;
    /* justify-content: center;
    align-items: center; */
    height: 70vh;
    overflow: auto;
    border: 1px solid black;
`;

export const ManageAccount = memo(({ setShowProfile }: { setShowProfile: (val: boolean) => void }) => {

    const { theme } = useTheme();

    const onClick = useCallback(() => (setShowProfile(false)), [setShowProfile]);

    const baseTheme = useMemo(() => {
        if (theme === 'dark') {
            return dark;
        }
    }, [theme]);

    return (
        <div className="flex flex-col absolute w-full h-full bg-[#000000B3] justify-center items-center top-0 bottom-0 right-0 left-0 z-10 m-auto gap-10">
            <GrClose onClick={onClick} className="absolute top-10 right-60 text-white size-10 cursor-pointer" />
            <StyledAccountWrapper>
                <UserProfile appearance={{ baseTheme: baseTheme }} />
            </StyledAccountWrapper>
        </div>
    );
});
