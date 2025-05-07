import { Session } from '@supabase/supabase-js'
import * as LocalAuthentication from 'expo-local-authentication'
import { router } from 'expo-router'
import { useEffect } from 'react'

import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/store'

export const useAuth = () => {
  const { setAuthUser, user, faceIdAccess, isReady } = useAppStore()

  const automaticLogin = async (session: Session) => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync()

      if (hasHardware && faceIdAccess) {
        const response = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Login com biometria',
          fallbackLabel: 'Usar senha',
        })

        if (response.success) {
          setAuthUser(session.user)
          router.replace('/(auth)/(tabs)/(home)')
          return
        }
      }

      router.replace({
        pathname: '/(public)/(login)',
        params: { email: session.user.email },
      })
    } catch {
      await supabase.auth.signOut()
      setAuthUser(null)
      router.replace({
        pathname: '/(public)/(login)',
        params: { email: session.user.email },
      })
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isReady) {
      if (user) {
        router.replace('/(auth)/(tabs)/(home)')
        return
      }

      const { data: listener } = supabase.auth.onAuthStateChange(async (_, session) => {
        if (session) {
          await automaticLogin(session)
        } else {
          router.replace('/(public)/(login)')
        }
      })

      return () => {
        listener.subscription?.unsubscribe()
      }
    }
  }, [user, isReady])
}
