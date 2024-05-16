import { memo } from "react";
import styled from "styled-components";
import { FaInfo } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

interface IPopupProps {
    message: string;
    type: 'info' | 'warning',
    positiveActionType?: 'Ok' | 'Submit',
    onPositiveAction: () => void,
    onNegativeAction?: () => void,
    disablePositiveAction?: boolean,
    disableNegativeAction?: boolean
}

const StyledPopup = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    gap: 20px;
    height: 260px;
    width: 35%;
    max-width: 600px;
    min-width: 400px; margin: auto;
    align-items: center;
    position: relative;
    background-color: ${({ theme: { commonColors: { normalWhite } } }) => (normalWhite)};
    border-radius: 10px;
    color: ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
`;

const MessageWrapper = styled.span`
    display: flex;
    height: 60%;
    color: ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
    font-size: 20px;
    text-align: center;
`;

const IconWrapper = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 8px;
`;

const ActionButton = styled.button<{ $bgColor: string, $disabled: boolean }>`
    background-color: ${({ theme: { semanticColors: { popupActionButtonBackgroundColor } } }) => (popupActionButtonBackgroundColor)};
    border: none;
    border-radius: 5px;
    padding: 6px;
    text-align: center;
    min-width: 120px;
    opacity: ${({ $disabled }) => ($disabled ? '0.5' : '1')};
    cursor: ${({ $disabled }) => ($disabled ? 'now-allowed' : 'pointer')};
`;

export const Popup = memo(({ message, type, onPositiveAction, positiveActionType = 'Ok', onNegativeAction,
    disablePositiveAction = false, disableNegativeAction = false }: IPopupProps) => {

    return (
        <div className="flex flex-col justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-[100] bg-[#000000B3] h-[100vh] w-[100vw]">
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
