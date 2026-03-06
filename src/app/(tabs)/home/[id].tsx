import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, Text } from 'react-native'
import { fetchFeedById } from '@/services/podcast-index'
import { useQuery } from '@tanstack/react-query';

export default function PodcastDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ['feed', id],
    queryFn: () => fetchFeedById(id)
  })

  const podcast = data?.feed;

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error || !podcast) {
    return <Text>Could not fetch the podcast</Text>
  }

  return (
    <Text>{podcast.title}</Text>
  )
}