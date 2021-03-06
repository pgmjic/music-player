import React, { useState } from 'react';

import Rain from './assets/Rain.mp3';
import 가세요 from './assets/가세요.m4a';
import 보라빛향기 from './assets/보라빛 향기.m4a';
import Dream from './assets/Dream.mp3';
import YouAreMyLady from './assets/You Are My Lady.m4a';
//import Summer from './bensound-summer.mp3';
import LostChameleon from "./assets/LostChameleon.mp3";
import Rock from './assets/TheHipsta.mp3';
import Tobu from './assets/Tobu.mp3';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    tracks: [
      {
        name: 'Lost Chameleon - Genesis',
        file: LostChameleon,
      },
      {
        name: 'The Hipsta - Shaken Soda',
        file: Rock,
      },
      {
        name: 'Tobu - Such Fun',
        file: Tobu,
      },
      {
        name: 'Rain',
        file: Rain,
      },
      {
        name: '가세요 - 고한우',
        file: 가세요,
      },
      {
        name: '보라빛 향기 - 강수지',
        file: 보라빛향기,
      },
      {
        name: 'Dream - 길학미',
        file: Dream,
      },
      {
        name: 'You Are My Lady - 김건모',
        file: YouAreMyLady,
      },
    ],
    audioPlayer: null,
    currentTrackIndex: null,
    isPlaying: false,
    isPaused: false,
    isEnded: false,
    elapsed: 0,               //  curr elapsed time 00:00
    total: 0,                 // total playing time 00:00
    position: 0,              // current range bar [0:1]
    duration: 0,              // track duration in seconds
    volume: 50,               // current volume [1:100]
    debug: true,             // turns on colsole.log
  });
  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export { MusicPlayerContext, MusicPlayerProvider };
