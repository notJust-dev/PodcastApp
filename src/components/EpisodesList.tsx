import { ActivityIndicator, Text, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { fetchEpisodesByFeedId } from '@/services/podcast-index'
import { EpisodeListItem } from './EpisodeListItem'

interface EpisodesListProps {
  feedId: string
}

export function EpisodesList({ feedId }: EpisodesListProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['episodes', feedId],
    queryFn: () => fetchEpisodesByFeedId(feedId),
  })

  if (isLoading) {
    return <ActivityIndicator className="py-4" />
  }

  if (error) {
    return <Text className="text-sm text-gray-400 py-4">Failed to load episodes</Text>
  }

  const episodes = data?.items ?? [];

  return (
    <View className="self-stretch mt-6">
      <Text className="text-lg font-bold mb-2">Episodes</Text>
      {episodes.map((episode) => (
        <EpisodeListItem key={episode.id} episode={episode} />
      ))}
    </View>
  )
}
