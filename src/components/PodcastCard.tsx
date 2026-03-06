import { View, Text, Image } from 'react-native'
import { Feed } from '@/types'

interface PodcastCardProps {
  podcast: Feed
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <View className="flex-1 gap-2">
      <Image
        className="w-full aspect-square rounded-2xl"
        source={{ uri: podcast.artwork || podcast.image }}
      />
      <View>
        <Text className="text-xs font-medium" numberOfLines={2}>
          {podcast.title}
        </Text>
        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {podcast.author}
        </Text>
      </View>
    </View>
  )
}
