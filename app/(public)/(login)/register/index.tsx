import { Image, Text } from '@/components'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

import useTheme from '@/hooks/useTheme'
import { router } from 'expo-router'
import RegisterForm from './RegisterForm'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function Register() {
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
      <AnimatedPressable entering={FadeInUp.delay(50).duration(700)} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={24} color={theme.primaryPurple100} />
      </AnimatedPressable>

      <Image
        entering={FadeInUp.delay(150).duration(700)}
        source={require('@/assets/logo.png')}
        style={{
          height: 150,
          width: 150,
          alignSelf: 'center',
        }}
      />
      <Text
        entering={FadeInUp.delay(250).duration(700)}
        fow={6}
        style={{ alignSelf: 'center', marginTop: 20, fontSize: 24 }}
      >
        Cadastrar
      </Text>
      <RegisterForm />
    </KeyboardAvoidingView>
  )
}
