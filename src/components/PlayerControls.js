import React from "react"
import useMusicPlayer from "../hooks/useMusicPlayer";
import Progress from './Progress';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, 
        faPlay, 
        faStepBackward, 
        faStepForward} from "@fortawesome/free-solid-svg-icons";

const PlayerControls = () => {
  const { 
    currentTrackName,
    state,
    togglePlay, 
    playPreviousTrack, 
    playNextTrack } = useMusicPlayer();
  return (
    <>
      <div className="box controls has-background-grey-dark">
        <div className="current-track has-text-light">
          <marquee>{currentTrackName}</marquee>
        </div>
        <div>
          <button className="button has-text-light has-background-grey-dark"
           onClick={playPreviousTrack} disabled={!currentTrackName}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className="button has-text-light has-background-grey-dark"
           onClick={togglePlay} disabled={!currentTrackName}>
            {state.isPlaying ? <FontAwesomeIcon icon={faPause} /> 
                       : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <button className="button has-text-light has-background-grey-dark"
           onClick={playNextTrack} disabled={!currentTrackName}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
        <Progress
          elapsed={state.elapsed}
          total={state.total}
          position={state.position}
          count={state.count}
        />
      </div>
    </>
  )
}

export default PlayerControls
