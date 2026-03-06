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
      renderItem={({ item }) => <Text>{item.title}</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
})
