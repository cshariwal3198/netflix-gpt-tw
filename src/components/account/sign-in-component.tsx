import { SignIn, SignUp } from "@clerk/clerk-react";
import { memo, useCallback, useState } from "react";

export const SignInContainer = memo(() => {

    const [alreadyUser, setAlreadyUser] = useState(true);

    const onClick = useCallback(() => (setAlreadyUser(!alreadyUser)), [alreadyUser]);

    return (
        <div className="flex flex-col gap-2 p-2 justify-center items-center h-[100%] bg-[#111111]">
            <span className="text-[50px] font-bold text-pretty font-sans text-[#627bee]">
                {alreadyUser ? 'Sign In' : 'Sign Up'}
            </span>
            {
                alreadyUser ? <SignIn /> : <SignUp />
            }
            <span className="flex gap-2 my-2 text-lg text-[#fdfdfd]">{alreadyUser ? 'Are you new here? Click ' : 'Already a user? Click'}
                <button className="border-none bg-none text-[#3d55c2] shadow-md" onClick={onClick}>{alreadyUser ? 'Sign Up' : 'Sign In'}</button>
            </span>
        </div>
    );
});
