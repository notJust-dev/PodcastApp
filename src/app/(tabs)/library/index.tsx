import { View, Text, Pressable, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDownloadsStore } from '@/stores/useDownloadsStore'

export default function LibraryScreen() {
  const { episodes } = useDownloadsStore();
  const downloadCount = Object.keys(episodes).length;

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic' className="flex-1">
      <Link href="/library/downloads" asChild>
        <Pressable className="flex-row items-center px-4 py-4 gap-4">
          <View className="w-10 h-10 rounded-lg bg-blue-500 items-center justify-center">
            <Ionicons name="arrow-down-circle" size={22} color="white" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-medium">Downloads</Text>
            <Text className="text-xs text-gray-400">
              {downloadCount} {downloadCount === 1 ? 'episode' : 'episodes'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
        </Pressable>
      </Link>
    </ScrollView>
  )
}
