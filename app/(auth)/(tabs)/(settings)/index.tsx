import Animated, { FadeInUp } from 'react-native-reanimated'

import { Checkbox, Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { useAppStore } from '@/store'
import * as LocalAuthentication from 'expo-local-authentication'
import { useCallback, useEffect, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import Header from './Header'

export default function Settings() {
  const { setFaceIdAccess, setTheme, theme, faceIdAccess } = useAppStore()
  const [phoneHasFingerprint, setPhoneHasFingerprint] = useState(false)
  const globalTheme = useTheme()

  const validateFingerprint = useCallback(async () => {
    const hasFingerprintHardware = await LocalAuthentication.hasHardwareAsync()

    setPhoneHasFingerprint(hasFingerprintHardware)
  }, [])

  useEffect(() => {
    validateFingerprint()
  }, [validateFingerprint])

  const onThemeChange = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  const onFingerprintChange = useCallback(async () => {
    const hasFingerprintCreated = await LocalAuthentication.isEnrolledAsync()
    if (!hasFingerprintCreated) {
      return Alert.alert(
        'Sem biometria',
        'Para utilizar o autenticação facial é necessário criar uma biometria.'
      )
    }

    if (!faceIdAccess) {
      const response = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login com biometria',
        fallbackLabel: 'Biometria não reconhecida',
      })

      setFaceIdAccess(response.success)
    } else {
      setFaceIdAccess(false)
    }
  }, [faceIdAccess, setFaceIdAccess])

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: 48,
        backgroundColor: globalTheme.background,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Header />
      <Animated.View
        entering={FadeInUp.delay(150).duration(150).springify()}
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Text fow={6}>Ativar Dark mode?</Text>
        <Checkbox
          checked={theme === 'dark'}
          onCheckedChange={onThemeChange}
          testID="checkbox-theme"
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(150).duration(150).springify()}
        style={{
          height: 1,
          width: '100%',
          marginVertical: 12,
          backgroundColor: globalTheme.primaryOrange100,
        }}
      />
      {phoneHasFingerprint && (
        <>
          <Animated.View
            entering={FadeInUp.delay(250).duration(150).springify()}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text fow={6}>Entrar com biometria facial?</Text>
            <Checkbox
              checked={faceIdAccess}
              onCheckedChange={onFingerprintChange}
              testID="checkbox-fingerprint"
            />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(250).duration(150).springify()}
            style={{
              height: 1,
              width: '100%',
              marginVertical: 12,
              backgroundColor: globalTheme.primaryOrange100,
            }}
          />
        </>
      )}
    </ScrollView>
  )
}
