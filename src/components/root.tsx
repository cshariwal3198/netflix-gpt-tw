import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./footer";

const Root = memo(() => {

    return (
        <div className="font-medium flex flex-col h-full w-full">
            <Navbar onSearch={() => ('')} />
            <div className="flex flex-col overflow-auto h-full">
                <Outlet />
                <Footer />
            </div>
        </div>
    )
});

export default Root;