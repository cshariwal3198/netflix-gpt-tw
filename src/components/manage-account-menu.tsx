import { UserProfile } from "@clerk/clerk-react";
import { memo, useCallback } from "react";
import { GrClose } from "react-icons/gr";

export const ManageAccount = memo(({ setShowProfile }: { setShowProfile: (val: boolean) => void }) => {

    const onClick = useCallback(() => (setShowProfile(false)), [setShowProfile]);

    return (
        <div className="flex flex-col absolute w-full h-full bg-[#000000B3] justify-center items-center top-0 bottom-0 right-0 left-0 z-10 m-auto gap-10">
            <GrClose onClick={onClick} className="absolute top-10 right-60 text-white size-10 cursor-pointer" />
            <div className="h-3/4 w-fit flex justify-center items-center overflow-auto rounded-3x">
                <UserProfile />
            </div>
        </div>
    );
});
