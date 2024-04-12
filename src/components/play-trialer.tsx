import { memo, useCallback } from "react";
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
    right: 20vh;
    top: 5vh; cursor: pointer;
    color: #fffffe;
`;

export const PlayTrailer = memo(({ videos, onClick }: {
    videos: {
        results: { id: number; key: string; name: string; }[];
    }, onClick: () => void
}) => {

    const renderTrailerVideo = useCallback(() => {
        const trailerObject = videos?.results?.find(({ name }) => (name.toLowerCase() === 'official trailer')) || videos?.results.slice(0, 1)[0];

        if (trailerObject) {
            const { id, key } = trailerObject;
            return (
                <Player videoSource={`https://www.youtube.com/embed/${key}`} />
            )
        }
        return <h1 className="text-2xl font-bold text-white">No Video</h1>;

    }, [videos?.results]);

    return (
        <StyledWrapper>
            <VideoWrapper>
                <StyledClose onClick={onClick} fontSize="large" fontWeight={700} />
                {renderTrailerVideo()}
            </VideoWrapper>
        </StyledWrapper>
    )
});
