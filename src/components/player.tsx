import "./control.css";
import { useState, useRef } from "react";
import {
    makeStyles,
    Slider,
    withStyles,
    Button,
    Tooltip,
    Popover,
    Grid, Container
} from "@material-ui/core";
import {
    FastForward,
    FastRewind,
    Pause,
    PlayArrow,
    SkipNext,
    VolumeUp,
    VolumeOff
} from "@material-ui/icons";
import ReactPlayer from 'react-player';

export const formatTime = (time) => {
    //formarting duration of video
    if (isNaN(time)) {
        return "00:00";
    }

    const date = new Date(time * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    if (hours) {
        //if video have hours
        return `${hours}:${minutes.toString().padStart(2, "0")} `;
    } else return `${minutes}:${seconds}`;
};

const useStyles = makeStyles({
    volumeSlider: {
        width: "100px",
        color: "#9556CC",
    },

    bottomIcons: {
        color: "#999",
        padding: "12px 8px",

        "&:hover": {
            color: "#fff",
        },
    },
});

const PrettoSlider = withStyles({
    root: {
        height: "20px",
        color: "#9556CC",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    thumb: {
        height: 20,
        width: 20,
        backgroundColor: "#9556CC",
        border: "2px solid currentColor",
        marginTop: -3,
        marginLeft: -12,
        "&:focus, &:hover, &$active": {
            boxShadow: "inherit",
        },
    },
    active: {},
    valueLabel: {
        left: "calc(-50% + 4px)",
    },
    track: {
        height: 5,
        borderRadius: 4,
        width: "100%",
    },
    rail: {
        height: 5,
        borderRadius: 4,
    },
})(Slider);

const Control = ({
    onPlayPause,
    playing,
    onRewind,
    onForward,
    played,
    onSeek,
    onSeekMouseUp,
    onVolumeChangeHandler,
    onVolumeSeekUp,
    volume,
    mute,
    onMute,
    duration,
    currentTime,
    onMouseSeekDown,
    controlRef
}: any) => {
    const classes = useStyles();


    return (
        <div className="control_Container" ref={controlRef}>
            <div className="top_container">
                <h2>Video PLayer</h2>
            </div>
            <div className="mid__container">
                <div className="icon__btn" onDoubleClick={onRewind}>
                    <FastRewind fontSize="medium" />
                </div>

                <div className="icon__btn" onClick={onPlayPause}>
                    {playing ? (
                        <Pause fontSize="medium" />
                    ) : (
                        <PlayArrow fontSize="medium" />
                    )}{" "}
                </div>

                <div className="icon__btn">
                    <FastForward fontSize="medium" onDoubleClick={onForward} />
                </div>
            </div>
            <div className="bottom__container">
                <div className="slider__container">
                    <PrettoSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onChangeCommitted={onSeekMouseUp}
                        onMouseDown={onMouseSeekDown}
                    />
                </div>
                <div className="control__box">
                    <div className="inner__controls">
                        <div className="icon__btn" onClick={onPlayPause}>
                            {playing ? (
                                <Pause fontSize="medium" />
                            ) : (
                                <PlayArrow fontSize="medium" />
                            )}{" "}
                        </div>

                        <div className="icon__btn">
                            <SkipNext fontSize="medium" />
                        </div>

                        <div className="icon__btn" onClick={onMute}>
                            {mute ? (
                                <VolumeOff fontSize="medium" />
                            ) : (
                                <VolumeUp fontSize="medium" />
                            )}
                        </div>

                        <Slider
                            className={`${classes.volumeSlider}`}
                            onChange={onVolumeChangeHandler}
                            value={volume * 100}
                            onChangeCommitted={onVolumeSeekUp}
                        />

                        <span>{currentTime} : {duration}</span>
                    </div>

                </div>
            </div>
        </div>
    );
};


export const Player = ({ videoSource }: { videoSource: string }) => {

    const videoPlayerRef = useRef(null);
    const controlRef = useRef(null);

    const [videoState, setVideoState] = useState({
        playing: true,
        muted: false,
        volume: 0.5,
        playbackRate: 1.0,
        played: 0,
        seeking: false,
        buffer: true,
    });

    //Destructuring the properties from the videoState
    const { playing, muted, volume, playbackRate, played, seeking, buffer } =
        videoState;

    const currentTime = videoPlayerRef.current
        ? videoPlayerRef.current.getCurrentTime()
        : "00:00";
    const duration = videoPlayerRef.current
        ? videoPlayerRef.current.getDuration()
        : "00:00";

    const formatCurrentTime = formatTime(currentTime);
    const formatDuration = formatTime(duration);

    const playPauseHandler = () => {
        //plays and pause the video (toggling)
        setVideoState({ ...videoState, playing: !videoState.playing });
    };

    const rewindHandler = () => {
        //Rewinds the video player reducing 5
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
    };

    const handleFastFoward = () => {
        //FastFowards the video player by adding 10
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
    };

    //console.log("========", (controlRef.current.style.visibility = "false"));
    const progressHandler = (state) => {
        if (count > 3) {
            console.log("close");
            controlRef.current.style.visibility = "hidden"; // toggling player control container
        } else if (controlRef.current.style.visibility === "visible") {
            count += 1;
        }

        if (!seeking) {
            setVideoState({ ...videoState, ...state });
        }
    };

    const seekHandler = (e, value) => {
        setVideoState({ ...videoState, played: parseFloat(value / 100) });
        videoPlayerRef.current.seekTo(parseFloat(value / 100));
    };

    const seekMouseUpHandler = (e, value) => {
        console.log(value);

        setVideoState({ ...videoState, seeking: false });
        videoPlayerRef.current.seekTo(value / 100);
    };

    const volumeChangeHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;

        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
        });
    };

    const volumeSeekUpHandler = (e, value) => {
        const newVolume = parseFloat(value) / 100;

        setVideoState({
            ...videoState,
            volume: newVolume,
            muted: newVolume === 0 ? true : false,
        });
    };

    const muteHandler = () => {
        //Mutes the video player
        setVideoState({ ...videoState, muted: !videoState.muted });
    };

    const onSeekMouseDownHandler = (e) => {
        setVideoState({ ...videoState, seeking: true });
    };

    const mouseMoveHandler = () => {
        controlRef.current.style.visibility = "visible";
        count = 0;
    };

    const bufferStartHandler = () => {
        console.log("Bufering.......");
        setVideoState({ ...videoState, buffer: true });
    };

    const bufferEndHandler = () => {
        console.log("buffering stoped ,,,,,,play");
        setVideoState({ ...videoState, buffer: false });
    };

    return (
        <div className="video_container">
            <div>
                <h2>React player</h2>
            </div>
            <Container maxWidth="md" justify="center" style={{ height: '100%' }}>
                <div className="player__wrapper" onMouseMove={mouseMoveHandler}>
                    <ReactPlayer
                        ref={videoPlayerRef}
                        className="player"
                        url={videoSource}
                        width="100%"
                        height="100%"
                        playing={playing}
                        volume={volume}
                        muted={muted}
                        onProgress={progressHandler}
                        onBuffer={bufferStartHandler}
                        onBufferEnd={bufferEndHandler}
                    />

                    {buffer && <p>Loading</p>}

                    <Control
                        controlRef={controlRef}
                        onPlayPause={playPauseHandler}
                        playing={playing}
                        onRewind={rewindHandler}
                        onForward={handleFastFoward}
                        played={played}
                        onSeek={seekHandler}
                        onSeekMouseUp={seekMouseUpHandler}
                        volume={volume}
                        onVolumeChangeHandler={volumeChangeHandler}
                        onVolumeSeekUp={volumeSeekUpHandler}
                        mute={muted}
                        onMute={muteHandler}
                        playRate={playbackRate}
                        duration={formatDuration}
                        currentTime={formatCurrentTime}
                        onMouseSeekDown={onSeekMouseDownHandler}
                    />
                </div>
            </Container>
        </div>
    );
}