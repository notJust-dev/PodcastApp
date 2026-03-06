import { useAuth, useUser } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

export default function ProfileScreen() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/')
  }

  return (
    <View style={styles.container}>
      {user?.imageUrl && (
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      )}
      <Text style={styles.name}>
        {user?.fullName || user?.emailAddresses[0]?.emailAddress}
      </Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
})
