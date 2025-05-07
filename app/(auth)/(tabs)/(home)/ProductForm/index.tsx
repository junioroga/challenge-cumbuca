import { AnimatedInput, Button } from '@/components'
import { useAppStore } from '@/store'
import { maskOnlyNumbers } from '@/utils/masks'

import { findMissingId } from '@/utils/utils'
import { formatCurrency, parseCurrency } from '@brazilian-utils/brazilian-utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { impactAsync } from 'expo-haptics'
import { useCallback, useEffect } from 'react'
import { Controller, Resolver, useForm } from 'react-hook-form'
import { Alert, Keyboard } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { InferType } from 'yup'
import schema from './schema'

export type FormFields = InferType<typeof schema>

const defaultValues = {
  name: '',
  quantity: 0,
  unityValue: 0,
  totalValue: 0,
}

export default function ProductForm() {
  const { addProduct, products } = useAppStore()
  const {
    control,
    formState: { isValid },
    setFocus,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<FormFields>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema) as Resolver<FormFields>,
  })

  const { quantity, unityValue } = watch()

  const createProduct = useCallback(
    (formData: FormFields) => {
      const ids = products.flatMap((item) => item.id)
      const id = findMissingId(ids) || 1

      addProduct({
        id,
        totalValue: formData.totalValue || 0,
        ...formData,
      })
    },
    [addProduct, products]
  )

  useEffect(() => {
    const totalValue = (quantity || 0) * parseCurrency(String(unityValue || 0))
    setValue('totalValue', Number(totalValue.toFixed(2)))
  }, [setValue, quantity, unityValue])

  const onSubmitForm = (data: FormFields) => {
    Keyboard.dismiss()
    impactAsync()
    createProduct(data)
    Alert.alert('Produto adicionado', 'O produto foi adicionado com sucesso', [
      { text: 'OK', onPress: () => reset(defaultValues) },
    ])
  }

  return (
    <>
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="test-name-input"
            entering={FadeInUp.delay(50).duration(150).springify()}
            label="Nome do produto"
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
            onSubmitEditing={() => setFocus('quantity')}
          />
        )}
      />
      <Controller
        name="quantity"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="test-quantity-input"
            ref={ref}
            entering={FadeInUp.delay(150).duration(150).springify()}
            label="Quantidade"
            onBlur={onBlur}
            onChangeText={(value) => onChange(maskOnlyNumbers(value))}
            value={value ? maskOnlyNumbers(String(value)) : ''}
            returnKeyType="done"
            clearButtonMode="always"
            inputMode="numeric"
            error={error?.message}
            onSubmitEditing={() => setFocus('unityValue')}
          />
        )}
      />
      <Controller
        name="unityValue"
        control={control}
        render={({ field: { ref, value, onChange, onBlur }, fieldState: { error } }) => (
          <AnimatedInput
            testID="test-unity-value-input"
            ref={ref}
            entering={FadeInUp.delay(250).duration(150).springify()}
            label="Valor unitário"
            onBlur={onBlur}
            onChangeText={(value) => onChange(formatCurrency(parseCurrency(value)))}
            value={value ? String(value) : undefined}
            returnKeyType="done"
            clearButtonMode="always"
            inputMode="numeric"
            error={error?.message}
            onSubmitEditing={handleSubmit(onSubmitForm)}
          />
        )}
      />
      <Controller
        name="totalValue"
        control={control}
        render={({ field: { value } }) => (
          <AnimatedInput
            testID="test-total-value-input"
            entering={FadeInUp.delay(350).duration(150).springify()}
            label="Valor total"
            value={value ? formatCurrency(value) : undefined}
            inputMode="numeric"
            editable={false}
          />
        )}
      />
      <Animated.View
        entering={FadeInUp.delay(450).duration(150).springify()}
        style={{ marginVertical: 8 }}
      >
        <Button
          testID="button-save"
          label="Salvar"
          onPress={handleSubmit(onSubmitForm)}
          disabled={!isValid}
        />
      </Animated.View>
    </>
  )
}
