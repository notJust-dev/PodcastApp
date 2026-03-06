import { View, Text, StyleSheet, Button, ActivityIndicator, FlatList } from 'react-native'
import { fetchTrending } from '@/services/podcast-index'
import { useQuery } from '@tanstack/react-query';

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
      renderItem={({ item }) => <Text className='text-2xl font-bold text-gray-500 p-5 m-10'>{item.title}</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  )
}