import { Image, Text } from '@/components'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { FadeInUp } from 'react-native-reanimated'

import useTheme from '@/hooks/useTheme'
import LoginForm from './login/LoginForm'

export default function Login() {
  const theme = useTheme()

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
      <Text
        entering={FadeInUp.delay(150).duration(700)}
        fow={6}
        style={{ alignSelf: 'center', marginTop: 20, fontSize: 24 }}
      >
        Entrar
      </Text>
      <LoginForm />
    </KeyboardAvoidingView>
  )
}
