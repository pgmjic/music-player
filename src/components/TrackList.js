import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import useMusicPlayer from "../hooks/useMusicPlayer";

const TrackList = () => {
  const { trackList, currentTrackName, playTrack, state } = useMusicPlayer();
  return (
    <>
      <div className="columns ">
        <div className="column is-12"> 
          <div className="panel is-primary">
            <p className="panel-heading has-text-centered">
              <span className="title">My Track List</span>
            </p> 
            <div className="trackBox" >
              {trackList.map((track, index) => (
                <div className="panel-block" key={index}>
                  <button className="button" onClick={() => playTrack(index)}>
                    {currentTrackName === track.name &&
                      state.isPlaying ? <FontAwesomeIcon icon={faPause} />
                      : <FontAwesomeIcon icon={faPlay} />}
                  </button>
                  <div className="song-title">
                    {track.name}
                  </div>
                </div>
              ))}
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackList