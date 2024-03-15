import { memo } from "react";

export const Navbar = memo(() => {
    return (
        <div className="flex justify-between h-20 shadow-md shadow-slate-700 mb-6 rounded-b-md">
            <img src="/images/neflix_logo.png" alt="Logo" className="w-40" />
            <div className="gap-2 p-5 font-semibold text-xl">
                <h3>Sign in</h3>
            </div>
        </div>
    )
})