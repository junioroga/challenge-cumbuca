import { AnimatedInput, Button } from '@/components'
import { Login as LoginProps, useAppStore } from '@/store'
import { formatCPF } from '@brazilian-utils/brazilian-utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import schema from './schema'

export type LoginFormProps = {
  onSubmitForm: (data: LoginProps) => void
}

export default function LoginForm({ onSubmitForm }: LoginFormProps) {
  const { login } = useAppStore()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    setFocus,
  } = useForm<LoginProps>({
    mode: 'all',
    defaultValues: {
      document: login.document,
      password: '',
      lastAccess: new Date(),
    },
    resolver: yupResolver(schema),
  })

  return (
    <View testID="login-form" style={{ paddingTop: 16 }}>
      <Controller
        name="document"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="cpf-input"
            ref={ref}
            entering={FadeInUp.delay(150).duration(150).springify()}
            label="CPF"
            onBlur={onBlur}
            onChangeText={(value) => onChange(formatCPF(value))}
            value={value}
            autoCorrect={false}
            autoComplete="off"
            returnKeyType="next"
            clearButtonMode="always"
            inputMode="numeric"
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
            entering={FadeInUp.delay(250).duration(150).springify()}
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
        entering={FadeInUp.delay(350).duration(150).springify()}
        style={{ marginVertical: 8 }}
      >
        <Button
          testID="submit-button"
          label={login.document ? 'Entrar' : 'Cadastrar'}
          onPress={handleSubmit(onSubmitForm)}
          disabled={!isValid}
        />
      </Animated.View>
    </View>
  )
}
