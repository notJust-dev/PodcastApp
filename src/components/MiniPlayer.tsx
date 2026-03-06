import { usePlayer } from '@/providers/PlayerProvider';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { router } from 'expo-router';
import { View, Text, Pressable, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MiniPlayer() {
  const placement = NativeTabs.BottomAccessory.usePlacement();
  const { player, playerStatus, episode } = usePlayer();

  if (!episode) return null;

  const togglePlayback = () => {
    if (playerStatus.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  const skipForward = () => {
    const duration = playerStatus.duration || 0;
    player.seekTo(Math.min(duration, playerStatus.currentTime + 30));
  };


  return (
    <Pressable
      onPress={() => router.push('/player')}
      className="flex-row items-center px-4 py-1 gap-3"
    >
      <Image
        className="w-12 h-12 rounded-lg"
        source={{ uri: episode.image || episode.feedImage }}
      />
      <View className="flex-1">
        <Text className="text-sm font-semibold" numberOfLines={1}>
          {episode.title}
        </Text>
        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {episode.datePublishedPretty}
        </Text>
      </View>
      <Pressable onPress={togglePlayback} className="p-2">
        <Ionicons name={playerStatus.playing ? 'pause' : 'play'} size={24} color="dimgray" />
      </Pressable>
      {placement === 'regular' && (
        <Pressable onPress={skipForward} className="p-2">
          <Ionicons name="play-forward" size={22} color="dimgray" />
        </Pressable>
      )
      }
    </Pressable>
  );
}
