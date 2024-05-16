import { useAuth, useUser } from "@clerk/clerk-react";
import { memo, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Popup } from "./popup/popup";
import { useTranslator } from "../hooks";

const styles = 'flex cursor-pointer text-center justify-center items-center w-full h-full rounded-xl text-[18px] hover:scale-125  hover:bg-zinc-200 text-black dark:text-white';

export const UserAccount = memo(() => {

    const [hover, setHover] = useState<boolean>(false);
    const [hidden, setHidden] = useState<boolean>(true);
    const { user } = useUser();
    const { signOut } = useAuth();
    const { translate } = useTranslator();

    const toggleHover = useCallback(() => setHover(!hover), [hover]);

    const onSignOutClick = useCallback(() => (signOut()), [signOut]);

    const openPopupUp = useCallback(() => (setHidden(false)), []);
    const userProfileText = useMemo(() => (translate('account.userProfile')), [translate]);

    return (
        <>
            <div className="" title={userProfileText}>
                <div>
                    <img src={user?.imageUrl} alt={userProfileText} className="h-10 rounded-3xl" onMouseEnter={() => setHover(true)} onClick={() => setHover(!hover)} />
                </div>
                {
                    hover ? (
                        <div onMouseLeave={toggleHover} className="absolute top-20 overflow-hidden right-4 p-3 z-10 flex flex-col w-fit h-1/4 justify-center items-center gap-5 rounded-xl bg-white dark:bg-black">
                            <div className="flex flex-col top-0 gap-2">
                                <h4 className="text-sm">{user?.fullName}</h4>
                                <h4 className="text-sm">{user?.primaryEmailAddress?.emailAddress}</h4>
                                <hr className="text-black dark:text-white font-bold" />
                            </div>
                            <span className={styles}>
                                <Link to="/account">{translate('account.profile')}</Link>
                            </span>
                            <span className={styles} onClick={openPopupUp}>{translate('account.signOut')}</span>
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