import { Episode } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type PlayerContext = {
  episode: Episode | null;
  setEpisode: (ep: Episode | null) => void;
}

const PlayerContext = createContext<PlayerContext | null>(null)

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [episode, setEpisode] = useState<Episode | null>(null);

  const setActiveEpisode = (episode: Episode | null) => {
    setEpisode(episode);

    // play audio
  }

  console.log("Currently playing: ", episode)

  return (
    <PlayerContext.Provider value={{ episode, setEpisode: setActiveEpisode }}>
      {children}
    </PlayerContext.Provider>
  )
}


export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}