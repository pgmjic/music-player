import React, { useEffect } from "react"
import useMusicPlayer from "../hooks/useMusicPlayer";
import Progress from './Progress';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, 
        faPlay,
        faVolumeUp,
        faStepBackward, 
        faStepForward} from "@fortawesome/free-solid-svg-icons";

const PlayerControls = () => {
  const { 
    currentTrackName,
    state,
    audioReady,
    audioEnded,
    updateTime,
    handleVolume,
    togglePlay, 
    playPreviousTrack, 
    playNextTrack } = useMusicPlayer();
  
  useEffect(() => {
    if (state.audioPlayer) {
      if (state.debug) console.log(`Effect state.audioPlayer: isEnded:${state.isEnded} isPlaying:${state.isPlaying} isPaused:${state.isPaused}`)
      if (state.isEnded) {
        if (state.debug) console.log('Effect isEnded');
        state.audioPlayer.removeEventListener("ended", audioEnded);
        state.audioPlayer.removeEventListener("timeupdate", () => { });
      }

      if (state.isPlaying) {
        if (state.debug) console.log('Effect isPlaying...')
        state.audioPlayer.addEventListener("timeupdate", updateTime);
      } else if (!state.isPaused) {
        if (state.debug) console.log('Effect state.audioPlayer new')
        state.audioPlayer.addEventListener("canplaythrough", audioReady);
        state.audioPlayer.addEventListener("ended", audioEnded);
      }
    }
    return () => {
      if (state.audioPlayer) {
        if (state.debug) console.log('Effect return:')
        if (state.isPlaying) {
          console.log('Effect return isPlaying');
          state.audioPlayer.removeEventListener("canplaythrough", audioReady);
        } else if (state.isEnded) {
          if (state.debug) console.log('Effect return isEnded');
          state.audioPlayer.removeEventListener("ended", audioEnded);
          state.audioPlayer.removeEventListener("timeupdate", () => { });
        }
      }
    }
  }, [state.audioPlayer, state.isPlaying, state.isEnded]);
    
  return (
    <>
      <div className="controlsContainer columns is-variable is-1">
        <div className="controls column is-12 has-background-grey-dark">
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
          />
        </div>
        <div className="field column is-2">
          <div className="control">
            <input className="mySlider"
              onChange={handleVolume}
              step="1" min="0" max="100" value={state.volume} type="range" />
          </div>
          <span>
            <FontAwesomeIcon icon={faVolumeUp} size='sm' />
          </span>
        </div>
      </div>
    </>
  )
}

export default PlayerControls
