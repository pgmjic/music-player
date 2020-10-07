import React, { useState } from 'react';

import Rain from './assets/Rain.mp3';
import 가세요 from './assets/가세요.m4a';
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
        name: '가세요',
        file: 가세요,
      },
    ],
    currentTrackIndex: null,
    isPlaying: false,
    elapsed: 0,
    total: 0,
    position: 0,
    duration: 0
  });
  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
}

export { MusicPlayerContext, MusicPlayerProvider };
