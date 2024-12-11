import { useAppStore } from '@/store'
import { Stack, router } from 'expo-router'
import * as SplashScreenExpo from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import useTheme from '@/hooks/useTheme'
import {
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts,
} from '@expo-google-fonts/montserrat'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function RootLayout() {
  const { isAuthenticated, isReady, theme } = useAppStore()
  const globalTheme = useTheme()
  const insets = useSafeAreaInsets()

  const [fontsLoaded, fontError] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  })

  useEffect(() => {
    if (isReady) {
      if (isAuthenticated) {
        router.replace('/(auth)/(tabs)/(home)')
      } else {
        router.replace('/(public)/(login)')
      }
    }
  }, [isAuthenticated, isReady])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreenExpo.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
      <View style={{ flex: 1, backgroundColor: globalTheme.background, paddingTop: insets.top }}>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(public)">
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </View>
    </GestureHandlerRootView>
  )
}
