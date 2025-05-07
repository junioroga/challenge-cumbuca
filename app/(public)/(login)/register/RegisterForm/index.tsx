import { AnimatedInput, Button } from '@/components'
import { supabase } from '@/lib/supabase'
import { yupResolver } from '@hookform/resolvers/yup'
import { impactAsync } from 'expo-haptics'
import { router } from 'expo-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Alert, View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import schema from './schema'

export type RegisterProps = {
  email: string
  password: string
  name: string
}

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setFocus,
  } = useForm<RegisterProps>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmitForm = async (data: RegisterProps) => {
    impactAsync()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
        },
      },
    })

    if (error) {
      Alert.alert('Erro ao cadastrar', 'Tente novamente mais tarde.')
      setLoading(false)
      return
    }

    setLoading(false)
    router.replace('/')
  }

  return (
    <View testID="login-form" style={{ paddingTop: 16 }}>
      <Controller
        name="name"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="name-input"
            ref={ref}
            entering={FadeInUp.delay(350).duration(150).springify()}
            label="Nome completo"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="next"
            clearButtonMode="always"
            inputMode="text"
            error={error?.message}
            onSubmitEditing={() => setFocus('email')}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="email-input"
            ref={ref}
            entering={FadeInUp.delay(450).duration(150).springify()}
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
            entering={FadeInUp.delay(550).duration(150).springify()}
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
        entering={FadeInUp.delay(650).duration(150).springify()}
        style={{ marginVertical: 8 }}
      >
        <Button
          testID="submit-button"
          label="Cadastrar"
          onPress={handleSubmit(onSubmitForm)}
          disabled={!isValid}
          loading={loading}
        />
      </Animated.View>
    </View>
  )
}
