import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import { fetchTrending } from '@/services/podcast-index'
import { useQuery } from '@tanstack/react-query';
import { PodcastCard } from '@/components/PodcastCard'

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trending'],
    queryFn: () => fetchTrending()
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    <Text>Failed to fetch trending</Text>
  }

  return (
    <FlatList
      data={data?.feeds}
      contentContainerClassName='gap-4 p-2'
      columnWrapperClassName='gap-2'
      renderItem={({ item }) =>
        <View className='flex-1 max-w-1/2'>
          <PodcastCard podcast={item} />
        </View>
      }
      contentInsetAdjustmentBehavior="automatic"
      numColumns={2}
    />
  )
}