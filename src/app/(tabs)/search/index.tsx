import { Stack } from 'expo-router'
import { useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { searchPodcasts } from '@/services/podcast-index'
import { PodcastCard } from '@/components/PodcastCard'
import { useDebounce } from '@uidotdev/usehooks'

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => searchPodcasts(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 1,
  })

  return (
    <View className="flex-1">
      <Stack.SearchBar
        placement="automatic"
        placeholder="Search podcasts"
        hideNavigationBar={false}
        onChangeText={(text) => setSearchTerm(text.nativeEvent.text)}
      />

      {!searchTerm ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Search for your favorite podcasts</Text>
        </View>
      ) : isLoading ? (
        <ActivityIndicator className="mt-8" />
      ) : error ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400">Something went wrong</Text>
        </View>
      ) : (
        <FlatList
          data={data?.feeds}
          contentContainerClassName="gap-2 p-2"
          columnWrapperClassName="gap-2"
          renderItem={({ item }) => (
            <View className="flex-1 max-w-1/2">
              <PodcastCard podcast={item} />
            </View>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentInsetAdjustmentBehavior="automatic"
        />
      )}
    </View>
  )
}
