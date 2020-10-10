import { useContext } from 'react';
import { MusicPlayerContext } from "../MusicPlayerContext";

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  // outputs numSeconds to 00:00 
  const formatSeconds = (numSeconds) => {
    var minutes = Math.floor(numSeconds / 60);
    var seconds = Math.floor(numSeconds % 60);

    return (minutes < 10 ? '0' : '') + minutes + ':' +
      (seconds < 10 ? '0' : '') + seconds;
  }

  // function called for audio.timeupdate event
  const updateTime = () => {
    setState(state => (
      {
        ...state,
        elapsed: formatSeconds(state.audioPlayer.currentTime),
        total: formatSeconds(state.duration),
        position: state.audioPlayer.currentTime / state.duration, 
      }
    ));
  }

  // volume control handler
  const handleVolume = (e) => {
    let value = e.target.value;
    if (state.audioPlayer) {
      state.audioPlayer.volume = value / 100;
      setState(state => (
        {
          ...state,
          volume: value
        }
      ))
    }
  }

  // Play a specific track
  function playTrack(index) {
    if (state.debug) console.log('playTrack index:'+index)
    if (index === state.currentTrackIndex) {
      togglePlay();
    } else {
      if (state.audioPlayer) {
        state.audioPlayer.pause();
        setState(state => (
          {
            ...state,
            audioPlayer: null,
          }
        ));
      }

      if (state.debug) console.log('playTrack: new audio')
      let audio = new Audio(state.tracks[index].file);
      audio.volume = state.volume/100;  // set volume to current setting
      setState(state => (
        { ...state,
          audioPlayer: audio,
          currentTrackIndex: index,
          isPlaying: false,
          isEnded: false, 
          isPaused: false,
        }
      ));
    }
  }
  
  function togglePlay() {
    if (state.audioPlayer) {
      if (state.isPlaying) {
        state.audioPlayer.pause();
      } else {
        state.audioPlayer.play();
      }
      setState(state => ({ ...state, 
        isPlaying: !state.isPlaying,
        isPaused: !state.isPaused }));
    }
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

  const audioReady = () => {
    /* the audio is now playable; play it if permissions allow */
    if (state.debug) 
      console.log('audioReady:' + (state.audioPlayer ? state.audioPlayer.duration : 'no duration'))
    state.audioPlayer.play();
    setState(state => (
      {
        ...state,
        isPlaying: true,
        isEnded: false,
        duration: state.audioPlayer ? state.audioPlayer.duration : 0,
      }
    ));
  }

  const audioEnded = () => {
    if (state.debug) console.log('audioEnded:' + state.currentTrackIndex)
    setState(state => (
      {
        ...state,
        isPlaying: false,
        isEnded: true,
      }
    ));
    playNextTrack();
  }

  return {
    trackList: state.tracks,
    currentTrackName: state.currentTrackIndex !== null && 
                      state.tracks[state.currentTrackIndex].name,
    state: state,
    audioReady,
    audioEnded,
    updateTime,
    handleVolume,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
  }
};

export default useMusicPlayer;
