import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer/footer";
import styled from "styled-components";
import { Navbar } from "./navbar/Navbar";

const StyledImage = styled.img`
    display: flex;
    width: 100%; height: 100%;
    position: fixed;
    filter: blur(8px);
    opacity: 0.7;
    mask-image: linear-gradient(180deg, #c7c4c4 80%, #0000 100%);
    z-index: -1;
`;

const Root = memo(() => {

    return (
        <div className="font-medium flex flex-col h-full w-full">
            <StyledImage src={`${import.meta.env.VITE_PUBLIC_URL}assets/nflix-bg.jpg`} />
            <Navbar />
            <div className="flex flex-col overflow-auto h-full">
                <Outlet />
                <Footer />
            </div>
        </div>
    )
});

export default Root;