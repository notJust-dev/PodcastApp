import { Stack } from 'expo-router'

export default function NewLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'New', headerLargeTitle: true }} />
    </Stack>
  )
}
