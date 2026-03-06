import { Episode } from '@/types';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { AudioPlayer, AudioStatus, createAudioPlayer, setAudioModeAsync, useAudioPlayerStatus } from 'expo-audio';


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

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
    });
  }, []);

  const setActiveEpisode = (episode: Episode | null) => {
    setEpisode(episode);

    player.replace({ uri: episode?.enclosureUrl })

    // Adjust with actual data
    player.setActiveForLockScreen(true, {
      title: 'My Audio Title',
      artist: 'Artist Name',
      albumTitle: 'Album Name',
      artworkUrl: 'https://example.com/artwork.jpg', // optional
    });


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