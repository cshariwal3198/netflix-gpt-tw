import { memo } from "react";
import { FaInfo } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { ActionButton, ActionWrapper, IconWrapper, MessageWrapper, StyledPopup } from "./popup-styles";
import { getClassNames } from "../utils";

interface IPopupProps {
    message: string;
    type: 'info' | 'warning',
    positiveActionType?: 'Ok' | 'Submit',
    onPositiveAction: () => void,
    onNegativeAction?: () => void,
    disablePositiveAction?: boolean,
    disableNegativeAction?: boolean
}

export const Popup = memo(({ message, type, onPositiveAction, positiveActionType = 'Ok', onNegativeAction,
    disablePositiveAction = false, disableNegativeAction = false }: IPopupProps) => {

    return (
        <div className={getClassNames([
            "flex flex-col justify-center items-center", "absolute top-0 right-0 bottom-0 left-0",
            "z-[100] bg-[#000000B3] h-[100vh] w-[100vw]"
        ])}>
            <StyledPopup>
                <IconWrapper>
                    {
                        type === 'info' ? <FaInfo size="40px" /> : <IoWarningOutline size="40px" />
                    }
                </IconWrapper>
                <MessageWrapper>{message}</MessageWrapper>
                <ActionWrapper>
                    <ActionButton $bgColor={'red'} onClick={onNegativeAction} $disabled={disablePositiveAction}>Cancel</ActionButton>
                    <ActionButton $bgColor="blue" onClick={onPositiveAction}
                        $disabled={disableNegativeAction}>{positiveActionType}</ActionButton>
                </ActionWrapper>
            </StyledPopup>
        </div>
    );
});
