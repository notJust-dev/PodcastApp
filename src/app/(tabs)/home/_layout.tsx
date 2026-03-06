import { useUser } from '@clerk/expo'
import { Link, Stack } from 'expo-router'
import { Image, Pressable, StyleSheet } from 'react-native'

export default function HomeLayout() {
  const { user } = useUser()

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerLargeTitle: true,
          headerRight: () => (
            <Link href="/profile" asChild>
              <Pressable>
                {user?.imageUrl ? (
                  <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
                ) : null}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: '',
          headerBackButtonDisplayMode: 'minimal',
          headerTransparent: true
        }} />
    </Stack>
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
})
