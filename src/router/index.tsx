import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Stack } from 'expo-router'

import useTheme from '@/hooks/useTheme'
import { View } from 'react-native'

export default function Router() {
  const globalTheme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ flex: 1, backgroundColor: globalTheme.background, paddingTop: insets.top }}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(public)">
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </View>
  )
}
