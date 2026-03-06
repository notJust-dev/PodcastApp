import '../../global.css'
import { Stack } from 'expo-router'

import { ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache';
import { resourceCache } from '@clerk/expo/resource-cache'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'
import PlayerProvider from '@/providers/PlayerProvider'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const queryClient = new QueryClient();

function RootStack() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ presentation: 'modal', title: 'Profile' }} />
        <Stack.Screen name='index' />
        <Stack.Screen
          name='player'
          options={{
            title: "Player",
            presentation: "modal",
          }}
        />
      </Stack.Protected>
    </Stack>
  )
}

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={publishableKey}
        tokenCache={tokenCache}
        __experimental_resourceCache={resourceCache}
      >
        <PlayerProvider>
          <RootStack />
        </PlayerProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}

