import { useClerk, useAuth } from "@clerk/clerk-react";
import styled from "styled-components";

const StyledImage = styled.img`
    height: 50%;
    width: 60%;
`;

export const FallBack = () => {

    const { user } = useClerk();
    const { isSignedIn } = useAuth();

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-2 h-[100%]">
            <span className="text-2xl font-bold font-sans text-black dark:text-white">Welcome {isSignedIn ? user?.firstName : 'User'}</span>
            <StyledImage src="/public/images/pn2.jpg" />
        </div>
    );
};
