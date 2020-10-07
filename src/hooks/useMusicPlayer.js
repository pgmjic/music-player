import { useEffect, useContext } from 'react';
import { MusicPlayerContext } from "../MusicPlayerContext";

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  const formatSeconds = (numSeconds) => {
    var hours = Math.floor(numSeconds / 3600);
    var minutes = Math.floor(numSeconds / 60);
    var seconds = Math.floor(numSeconds % 60);

    return (minutes < 10 ? '0' : '') + minutes + ':' +
       (seconds < 10 ? '0' : '') + seconds;
 }

  const audioReady = () => {
    /* the audio is now playable; play it if permissions allow */
    setState(state => (
      {
        ...state,
        duration: state.audioPlayer.duration
      }
    ));
  }
/*  
  useEffect(() => {
    if (state.audioPlayer) {
      state.audioPlayer.addEventListener("canplaythrough", audioReady);

      state.audioPlayer.addEventListener("timeupdate", 
        () => {
          let progressBar = document.querySelector('.progress');
          setState(
            {
              ...state,
              elapsed: formatMilliseconds(state.audioPlayer.currentTime),
              total: formatMilliseconds(state.duration),
              position: state.audioPlayer.currentTime / state.duration      
            }
          );
        }
      );
    }

    return () => {
      state.audioPlayer.removeEventListener("canplaythrough", audioReady);
    };
  }, [state.audioPlayer]);
*/

  // Play a specific track
  function playTrack(index) {
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      if (state.audioPlayer) {
        state.audioPlayer.pause();
        state.audioPlayer.removeEventListener("canplaythrough", audioReady);
      }

      state.audioPlayer = new Audio(state.tracks[index].file);
      state.audioPlayer.addEventListener("canplaythrough", audioReady);
      state.audioPlayer.addEventListener("timeupdate", 
        () => {
          setState(state => (
            {
              ...state,
              elapsed: formatSeconds(state.audioPlayer.currentTime),
              total: formatSeconds(state.duration),
              position: state.audioPlayer.currentTime / state.duration, 
            }
          ));
        }
      );

      state.audioPlayer.play();
      setState(state => (
        { ...state, 
          currentTrackIndex: index, 
          isPlaying: true         
        }
      ));
    }
  }
  
  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }
  

  // Play the previous track in the tracks array
  function playPreviousTrack() {
    const newIndex = ((state.currentTrackIndex + -1) % state.tracks.length + state.tracks.length) % state.tracks.length;
    playTrack(newIndex);
  }

  // Play the next track in the tracks array
  function playNextTrack() {
    const newIndex = (state.currentTrackIndex + 1) % state.tracks.length;
    playTrack(newIndex);
  }

  return {
    trackList: state.tracks,
    playTrack,
    togglePlay,
    currentTrackName: state.currentTrackIndex !== null && 
                      state.tracks[state.currentTrackIndex].name,
    state: state,
    playPreviousTrack,
    playNextTrack,
  }
};

export default useMusicPlayer;
