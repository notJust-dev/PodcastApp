import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { fetchFeedById } from '@/services/podcast-index'
import { useQuery } from '@tanstack/react-query';
import { EpisodesList } from '@/components/EpisodesList'

export default function PodcastDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['feed', id],
    queryFn: () => fetchFeedById(id)
  })

  const podcast = data?.feed;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }

  if (error || !podcast) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Could not fetch the podcast</Text>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="items-center px-6 py-8"
      contentInsetAdjustmentBehavior='automatic'
    >
      <Image
        className="w-60 h-60 rounded-2xl"
        source={{ uri: podcast.artwork || podcast.image }}
      />

      <Text className="text-xl font-bold text-center mt-5">
        {podcast.title}
      </Text>

      <Text className="text-sm text-gray-400 mt-1">
        {podcast.author}
      </Text>

      {podcast.description ? (
        <View className="mt-5 self-stretch">
          <Text
            className="text-sm text-gray-600 leading-5"
            numberOfLines={showFullDescription ? undefined : 4}
          >
            {podcast.description}
          </Text>
          <Pressable onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text className="text-sm font-medium text-blue-500 mt-1">
              {showFullDescription ? 'LESS' : 'MORE'}
            </Text>
          </Pressable>
        </View>
      ) : null}

      <EpisodesList feedId={id} />
    </ScrollView>
  )
}
