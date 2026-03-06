import { usePlayer } from '@/providers/PlayerProvider';
import { Redirect } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Slider from '@react-native-community/slider';

export default function PlayerScreen() {
  const { episode, player, playerStatus } = usePlayer();

  if (!episode) {
    return <Redirect href={"/home"} />
  }

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
        <Pressable>
          <Ionicons name="ellipsis-horizontal" size={24} color="#9ca3af" />
        </Pressable>
      </View>

      {/* Progress bar */}
      <View className="mt-6">
        <Slider
          minimumValue={0}
          maximumValue={1}
          value={0}
          minimumTrackTintColor="#3b82f6"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#3b82f6"
        />
        <View className="flex-row justify-between px-1 mt-1">
          <Text className="text-xs text-gray-400">0:00</Text>
          <Text className="text-xs text-gray-400">
            -{formatTime(episode.duration)}
          </Text>
        </View>
      </View>

      {/* Playback controls */}
      <View className="flex-row items-center justify-between mt-4 px-4">
        <Pressable>
          <Text className="text-black text-base font-medium">1x</Text>
        </Pressable>
        <Pressable>
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
          <Ionicons name={playerStatus.playing ? 'pause' : 'play'} size={32} color="white" style={{ marginLeft: 3 }} />
        </Pressable>
        <Pressable>
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
            value={0.5}
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

function formatTime(seconds: number | null): string {
  if (!seconds) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
