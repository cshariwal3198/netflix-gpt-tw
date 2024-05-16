import styled from "styled-components";
import { useTranslator } from "../hooks";

const StyledImage = styled.img`
    height: 50%;
    width: 60%;
`;

export const FallBack = () => {

    const { translate } = useTranslator();

    return (
        <div className="flex flex-col gap-2 justify-center items-center p-2 h-[100%]">
            <span className="text-2xl font-bold font-sans text-black dark:text-white">{`${translate('general.loadingPleaseWait')}`}</span>
            <StyledImage src={`${import.meta.env.VITE_PUBLIC_URL}assets/pn2.jpg`} />
        </div>
    );
};
