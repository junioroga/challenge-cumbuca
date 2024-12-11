import { Image } from '@/components'
import { Login as LoginProps, useAppStore } from '@/store'
import { impactAsync } from 'expo-haptics'
import { useCallback, useEffect } from 'react'
import { Alert, KeyboardAvoidingView, Platform } from 'react-native'
import { FadeInUp } from 'react-native-reanimated'

import useTheme from '@/hooks/useTheme'
import * as LocalAuthentication from 'expo-local-authentication'
import LoginForm from './LoginForm'

export default function Login() {
  const { onLogin, onRegister, login, faceIdAccess, setIsAuthenticated, isAuthenticated } =
    useAppStore()
  const theme = useTheme()

  const onFingerprintLogin = useCallback(async () => {
    const hasFingerprintHardware = await LocalAuthentication.hasHardwareAsync()

    if (hasFingerprintHardware && faceIdAccess && login.document) {
      const response = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login com biometria',
        fallbackLabel: 'Biometria não reconhecida',
      })

      if (response.success) {
        setIsAuthenticated(true)
        onLogin({
          ...login,
          lastAccess: new Date(),
        })
      }
    }
  }, [login, faceIdAccess, onLogin, setIsAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      onFingerprintLogin()
    }
  }, [onFingerprintLogin, isAuthenticated])

  const onSubmitForm = (data: LoginProps) => {
    impactAsync()

    if (login.document) {
      if (login.document === data.document && login.password === data.password) {
        onLogin({
          ...data,
          lastAccess: new Date(),
        })
        setIsAuthenticated(true)
      } else {
        Alert.alert(
          'Credenciais inválidas',
          'Os dados informados não correspondem com os dados cadastrados'
        )
      }
    } else {
      onRegister({
        ...data,
        lastAccess: new Date(),
      })
      setIsAuthenticated(true)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={{
        flex: 1,
        backgroundColor: theme.background,
        padding: 20,
      }}
    >
      <Image
        entering={FadeInUp.delay(50).duration(700)}
        source={require('@/assets/logo.png')}
        style={{
          height: 150,
          width: 150,
          alignSelf: 'center',
        }}
      />
      <LoginForm onSubmitForm={onSubmitForm} />
    </KeyboardAvoidingView>
  )
}
