import { usePlayer } from '@/providers/PlayerProvider';
import { Redirect } from 'expo-router';
import { Text } from 'react-native';

export default function PlayerScreen() {
  const { episode } = usePlayer();

  if (!episode) {
    return <Redirect href={"/home"} />
  }

  return (
    <Text>{episode.title}</Text>
  )
}