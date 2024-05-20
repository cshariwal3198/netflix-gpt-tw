import styled from "styled-components";

export const StyledPopup = styled.div`
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

export const MessageWrapper = styled.span`
    display: flex;
    height: 60%;
    color: ${({ theme: { commonColors: { normalBlack } } }) => (normalBlack)};
    font-size: 20px;
    text-align: center;
`;

export const IconWrapper = styled.div`
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ActionWrapper = styled.div`
    display: flex;
    gap: 20px;
    padding: 8px;
`;

export const ActionButton = styled.button<{ $bgColor: string, $disabled: boolean }>`
    background-color: ${({ theme: { semanticColors: { popupActionButtonBackgroundColor } } }) => (popupActionButtonBackgroundColor)};
    border: none;
    border-radius: 5px;
    padding: 6px;
    text-align: center;
    min-width: 120px;
    opacity: ${({ $disabled }) => ($disabled ? '0.5' : '1')};
    cursor: ${({ $disabled }) => ($disabled ? 'now-allowed' : 'pointer')};
`;