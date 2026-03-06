import { useState } from 'react';
import { usePlayer } from '@/providers/PlayerProvider';
import { Redirect } from 'expo-router';
import { ActivityIndicator, Alert, Image, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { downloadEpisode, deleteEpisodeDownload } from '@/services/downloads';
import { useDownloadsStore } from '@/stores/useDownloadsStore';

const PLAYBACK_RATES = [0.5, 0.75, 1, 1.25, 1.5, 2];

export default function PlayerScreen() {
  const { episode, player, playerStatus } = usePlayer();
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { addDownload, removeDownload, isDownloaded: checkDownloaded } = useDownloadsStore();
  const isDownloaded = episode ? checkDownloaded(episode.guid) : false;

  if (!episode) {
    return <Redirect href={"/home"} />
  }

  const duration = playerStatus.duration || episode.duration || 0;
  const progress = duration > 0 ? playerStatus.currentTime / duration : 0;

  const cyclePlaybackRate = () => {
    const currentIndex = PLAYBACK_RATES.indexOf(player.playbackRate);
    const nextIndex = (currentIndex + 1) % PLAYBACK_RATES.length;
    player.setPlaybackRate(PLAYBACK_RATES[nextIndex]);
  };

  const skipBackward = () => {
    player.seekTo(Math.max(0, playerStatus.currentTime - 15));
  };

  const skipForward = () => {
    player.seekTo(Math.min(duration, playerStatus.currentTime + 30));
  };

  return (
    <View className="flex-1 bg-white px-6 pt-4">
      {/* Artwork */}
      <View className="items-center mt-8">
        <Image
          className="w-80 h-80 rounded-2xl"
          source={{ uri: episode.image || episode.feedImage }}
        />
      </View>

      {/* Episode info */}
      <View className="flex-row items-center mt-8 gap-3">
        <Image
          className="w-12 h-12 rounded-lg"
          source={{ uri: episode.feedImage }}
        />
        <View className="flex-1">
          <Text className="text-xs text-gray-400">
            {episode.datePublishedPretty}
          </Text>
          <Text className="text-base font-semibold text-black" numberOfLines={1}>
            {episode.title}
          </Text>
          <Text className="text-sm text-gray-400" numberOfLines={1}>
            {episode.feedTitle}
          </Text>
        </View>
        <Pressable
          onPress={async () => {
            if (isDownloading) return;
            if (isDownloaded) {
              Alert.alert('Remove Download', 'Delete the downloaded episode?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    deleteEpisodeDownload(episode.id);
                    removeDownload(episode.guid);
                  },
                },
              ]);
              return;
            }
            setIsDownloading(true);
            try {
              const localUri = await downloadEpisode(episode.id, episode.enclosureUrl);
              addDownload({
                guid: episode.guid,
                title: episode.title,
                image: episode.image || episode.feedImage,
                feedId: String(episode.feedId),
                feedTitle: episode.feedTitle,
                localUri,
                downloadedAt: Date.now(),
                episodeData: episode,
              });
            } catch (e) {
              console.log(e);
              Alert.alert('Download Failed', 'Could not download the episode.');
            } finally {
              setIsDownloading(false);
            }
          }}
        >
          {isDownloading ? (
            <ActivityIndicator size="small" />
          ) : (
            <Ionicons
              name={isDownloaded ? 'checkmark-circle' : 'arrow-down-circle-outline'}
              size={28}
              color={isDownloaded ? '#3b82f6' : '#9ca3af'}
            />
          )}
        </Pressable>
      </View>

      {/* Progress bar */}
      <View className="mt-6">
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={isSeeking ? seekValue : progress}
          onSlidingStart={() => setIsSeeking(true)}
          onValueChange={(value) => setSeekValue(value)}
          onSlidingComplete={(value) => {
            player.seekTo(value * duration);
            setIsSeeking(false);
          }}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#3b82f6"
        />
        <View className="flex-row justify-between px-1 mt-1">
          <Text className="text-xs text-gray-400">
            {formatTime(isSeeking ? seekValue * duration : playerStatus.currentTime)}
          </Text>
          <Text className="text-xs text-gray-400">
            -{formatTime(duration - (isSeeking ? seekValue * duration : playerStatus.currentTime))}
          </Text>
        </View>
      </View>

      {/* Playback controls */}
      <View className="flex-row items-center justify-between mt-4 px-4">
        <Pressable onPress={cyclePlaybackRate}>
          <Text className="text-black text-base font-medium">
            {player.playbackRate}x
          </Text>
        </Pressable>
        <Pressable onPress={skipBackward}>
          <Ionicons name="play-back" size={28} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            if (playerStatus.playing) {
              player.pause();
            } else {
              player.play();
            }
          }}
          className="w-16 h-16 rounded-full bg-black items-center justify-center">
          <Ionicons
            name={playerStatus.playing ? 'pause' : 'play'}
            size={32}
            color="white"
            style={!playerStatus.playing ? { marginLeft: 3 } : undefined}
          />
        </Pressable>
        <Pressable onPress={skipForward}>
          <Ionicons name="play-forward" size={28} color="black" />
        </Pressable>
        <Pressable>
          <Ionicons name="moon-outline" size={22} color="#9ca3af" />
        </Pressable>
      </View>

      {/* Volume slider */}
      <View className="flex-row items-center mt-10 gap-2">
        <Ionicons name="volume-low" size={20} color="#9ca3af" />
        <View className="flex-1">
          <Slider
            minimumValue={0}
            maximumValue={1}
            value={player.volume}
            onValueChange={(value) => { player.volume = value; }}
            minimumTrackTintColor="#9ca3af"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#9ca3af"
          />
        </View>
        <Ionicons name="volume-high" size={20} color="#9ca3af" />
      </View>
    </View>
  )
}

function formatTime(seconds: number | null | undefined): string {
  if (!seconds || seconds < 0) return '0:00';
  const totalSeconds = Math.floor(seconds);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
