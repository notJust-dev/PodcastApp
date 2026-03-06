import { Stack } from 'expo-router'

export default function LibraryLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Library', headerLargeTitle: true }} />
    </Stack>
  )
}
