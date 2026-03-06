import { Episode } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { AudioPlayer, AudioStatus, createAudioPlayer, useAudioPlayerStatus } from 'expo-audio';


type PlayerContext = {
  episode: Episode | null;
  setEpisode: (ep: Episode | null) => void;
  player: AudioPlayer;
  playerStatus: AudioStatus
}

const PlayerContext = createContext<PlayerContext | null>(null)

const player = createAudioPlayer(null, { updateInterval: 500 });

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const status = useAudioPlayerStatus(player);

  const setActiveEpisode = (episode: Episode | null) => {
    setEpisode(episode);

    player.replace({ uri: episode?.enclosureUrl })
    player.play();
  }

  console.log("Currently playing: ", episode)

  return (
    <PlayerContext.Provider
      value={{
        episode,
        setEpisode: setActiveEpisode,
        player,
        playerStatus: status
      }}>
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