import { memo } from "react";
import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";

const Root = memo(() => {

    return (
        <div className="font-medium flex flex-col">
            <Navbar onSearch={() => ('')} />
            <Outlet />
        </div>
    )
});

export default Root;