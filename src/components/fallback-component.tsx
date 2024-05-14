import styled from "styled-components";

const StyledImage = styled.img`
    height: 50%;
    width: 60%;
`;

export const FallBack = () => {

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-2 h-[100%]">
            <span className="text-2xl font-bold font-sans text-black dark:text-white">Loading, Please Wait...</span>
            <StyledImage src={`${import.meta.env.VITE_PUBLIC_URL}assets/pn2.jpg`} />
        </div>
    );
};
