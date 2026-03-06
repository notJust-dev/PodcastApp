import { View, Text, Image, Pressable, FlatList, Alert } from 'react-native'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDownloadsStore, DownloadedEpisode } from '@/stores/useDownloadsStore'
import { deleteEpisodeDownload } from '@/services/downloads'
import { usePlayer } from '@/providers/PlayerProvider'

function DownloadItem({ episode }: { episode: DownloadedEpisode }) {
  const { removeDownload } = useDownloadsStore();
  const { setEpisode } = usePlayer();

  const handlePlay = () => {
    setEpisode(episode.episodeData);
    router.push('/player');
  };

  const handleDelete = () => {
    Alert.alert('Remove Download', `Delete "${episode.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const idMatch = episode.localUri.match(/episode-(\d+)\.mp3/);
          if (idMatch) {
            deleteEpisodeDownload(Number(idMatch[1]));
          }
          removeDownload(episode.guid);
        },
      },
    ]);
  };

  return (
    <Pressable onPress={handlePlay} className="flex-row items-center gap-3 px-4 py-3">
      <Image
        className="w-14 h-14 rounded-lg"
        source={{ uri: episode.image }}
      />
      <View className="flex-1">
        <Text className="text-sm font-medium" numberOfLines={2}>
          {episode.title}
        </Text>
        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {episode.feedTitle}
        </Text>
      </View>
      <Pressable onPress={handleDelete} className="p-2">
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </Pressable>
    </Pressable>
  );
}

export default function DownloadsScreen() {
  const { episodes } = useDownloadsStore();
  const downloadsList = Object.values(episodes).sort(
    (a, b) => b.downloadedAt - a.downloadedAt
  );

  return (
    <FlatList
      data={downloadsList}
      keyExtractor={(item) => item.guid}
      renderItem={({ item }) => <DownloadItem episode={item} />}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center pt-20">
          <Ionicons name="cloud-download-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-400 mt-3">No downloaded episodes</Text>
        </View>
      }
    />
  );
}
