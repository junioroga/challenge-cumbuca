import * as SplashScreenExpo from 'expo-splash-screen'

import { SplashScreen } from '@/components'
import { useAppStore } from '@/store'

SplashScreenExpo.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: '(public)',
}

export default function App() {
  const { setIsReady, isReady } = useAppStore()

  return !isReady && <SplashScreen setIsReady={setIsReady} />
}
