import { AnimatedInput, Button, Text } from '@/components'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { impactAsync } from 'expo-haptics'
import { Link, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, Pressable, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { RegisterProps } from '../../register/RegisterForm'
import schema from './schema'

export type LoginProps = Omit<RegisterProps, 'name'>

type LoginParams = {
  email?: string
}

export default function LoginForm() {
  const { email } = useLocalSearchParams<LoginParams>()
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAppStore()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setFocus,
  } = useForm<LoginProps>({
    mode: 'all',
    defaultValues: {
      email: email || '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmitForm = async (data: LoginProps) => {
    impactAsync()
    setLoading(true)

    const { error, data: session } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      Alert.alert('Erro ao fazer login', 'Credenciais inválidas')
      setLoading(false)
      return
    }

    setLoading(false)
    setAuthUser(session.user)
  }

  return (
    <View testID="login-form" style={{ paddingTop: 16 }}>
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="email-input"
            ref={ref}
            entering={FadeInUp.delay(250).duration(150).springify()}
            label="E-mail"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="next"
            clearButtonMode="always"
            inputMode="email"
            error={error?.message}
            onSubmitEditing={() => setFocus('password')}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="password-input"
            ref={ref}
            entering={FadeInUp.delay(350).duration(150).springify()}
            label="Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCorrect={false}
            autoComplete="off"
            secureTextEntry
            returnKeyType="done"
            clearButtonMode="always"
            inputMode="text"
            error={error?.message}
            onSubmitEditing={handleSubmit(onSubmitForm)}
          />
        )}
      />
      <Animated.View
        entering={FadeInUp.delay(450).duration(150).springify()}
        style={{ marginVertical: 8 }}
      >
        <Button
          testID="submit-button"
          label="Entrar"
          onPress={handleSubmit(onSubmitForm)}
          disabled={!isValid}
          loading={loading}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(550).duration(700)}
        style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 4 }}
      >
        <Text style={{ marginTop: 16, fontSize: 14 }}>Ainda não tenho cadastro</Text>
        <Link href="/(public)/(login)/register" asChild>
          <Pressable>
            <Text
              variant="secondary"
              style={{ marginTop: 16, fontSize: 14, textDecorationLine: 'underline' }}
            >
              clique aqui
            </Text>
          </Pressable>
        </Link>
      </Animated.View>
    </View>
  )
}
