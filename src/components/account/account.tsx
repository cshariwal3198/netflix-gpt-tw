import { useAuth, useUser } from "@clerk/clerk-react";
import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Popup } from "../popup/popup";
import { useTranslator } from "../../hooks";
import { getClassNames } from "../utils";

export const UserAccount = memo(() => {

    const [canShowAccountInfo, setCanShowAccountInfo] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(true);
    const { user } = useUser();
    const { signOut } = useAuth();
    const { translate } = useTranslator();

    const toggleHover = useCallback(() => setCanShowAccountInfo(!canShowAccountInfo), [canShowAccountInfo]);

    const openAccountInfoFlyOut = useCallback(() => (setCanShowAccountInfo(true)), []);

    const onSignOutClick = useCallback(() => (signOut()), [signOut]);

    const openPopupUp = useCallback(() => (setHidden(false)), []);
    const userProfileText = useMemo(() => (translate('account.userProfile')), [translate]);

    return (
        <>
            <div className="">
                <div className="">
                    <img role="none" title={userProfileText} src={user?.imageUrl} alt={userProfileText} className="h-10 rounded-3xl" onMouseEnter={openAccountInfoFlyOut} onClick={openAccountInfoFlyOut} />
                </div>
                {
                    canShowAccountInfo ? (
                        <div className="flex absolute top-0 bottom-0 right-0 left-0 z-30 size-full" role="none" onClick={toggleHover}>
                            <div role="none" className={getClassNames([
                                "flex flex-col w-fit h-1/4 justify-center items-center",
                                "absolute top-20 overflow-hidden right-4 p-3 z-10",
                                "gap-5 rounded-xl bg-white dark:bg-black"
                            ])}>
                                <div className="flex flex-col top-0 gap-2">
                                    <h4 className="text-sm">{user?.fullName}</h4>
                                    <h4 className="text-sm">{user?.primaryEmailAddress?.emailAddress}</h4>
                                    <hr className="text-black dark:text-white font-bold" />
                                </div>
                                <span className={getClassNames([
                                    "flex cursor-pointer text-center justify-center items-center w-full h-full",
                                    "rounded-xl text-[18px] hover:scale-125  hover:bg-zinc-200 text-black dark:text-white"
                                ])}>
                                    <Link to="/account">{translate('account.profile')}</Link>
                                </span>
                                <span role="none" className={getClassNames([
                                    "flex cursor-pointer text-center justify-center items-center w-full h-full",
                                    "rounded-xl text-[18px] hover:scale-125  hover:bg-zinc-200 text-black dark:text-white"
                                ])} onClick={openPopupUp}>{translate('account.signOut')}</span>
                            </div>
                        </div>
                    ) : null
                }
            </div>
            {
                hidden ? null : <Popup message={translate('account.signOutPromptMessage')} type="warning" onPositiveAction={onSignOutClick} onNegativeAction={() => setHidden(true)} />
            }
        </>
    )
});