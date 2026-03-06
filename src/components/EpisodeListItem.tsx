import { Image, Pressable, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Episode } from '@/types'
import { usePlayer } from '@/providers/PlayerProvider';
import { router } from 'expo-router';

interface EpisodeListItemProps {
  episode: Episode
}

function formatDuration(seconds: number | null): string {
  if (!seconds) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} min`;
}

export function EpisodeListItem({ episode }: EpisodeListItemProps) {
  const { setEpisode } = usePlayer();

  return (
    <View className="flex-row gap-3 py-4">
      <View className="flex-1 gap-1">
        <Text className="text-xs text-gray-400">
          {episode.datePublishedPretty}
        </Text>
        <Text className="text-base font-bold" numberOfLines={2}>
          {episode.title}
        </Text>
        <Text className="text-xs text-gray-500" numberOfLines={2}>
          {episode.description}
        </Text>
        {episode.duration ? (
          <Pressable onPress={() => {
            setEpisode(episode);
            router.push('/player')
          }} className="flex-row items-center gap-1 mt-1 bg-neutral-200 self-start p-2 rounded-full">
            <Ionicons name="play" size={12} color="black" />
            <Text className="text-xs font-medium">
              {formatDuration(episode.duration)}
            </Text>
          </Pressable>
        ) : null}
      </View>
      <Image
        className="w-20 h-20 rounded-xl"
        source={{ uri: episode.image || episode.feedImage }}
      />
    </View>
  )
}
