import { memo } from "react";
import styled from "styled-components";
import { Player } from "./player/player";
import { Close } from "@material-ui/icons";

const StyledWrapper = styled.div`
    display: flex;
    top: 0; bottom: 0;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 10;
    background-color: #000000B3;
`;

const VideoWrapper = styled.div`
    display: flex;
    height: 80%;
    width: 90%;
    justify-content: center;
    align-items: center;
`;

const StyledClose = styled(Close)`
    font-weight: 900;
    position: fixed;
    right: 10%;
    top: 5vh; cursor: pointer;
    color: #fffffe;
`;

export const PlayTrailer = memo(({ keyToPlay, onClick }: {
    keyToPlay: string, onClick: () => void
}) => {

    return (
        <StyledWrapper>
            <VideoWrapper>
                <StyledClose onClick={onClick} fontSize="large" fontWeight={700} />
                <Player videoSource={`https://www.youtube.com/embed/${keyToPlay}`} />
            </VideoWrapper>
        </StyledWrapper>
    )
});
