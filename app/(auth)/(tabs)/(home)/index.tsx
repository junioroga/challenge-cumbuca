import { useRef } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import useTheme from '@/hooks/useTheme'
import Header from './Header'
import ProductForm from './ProductForm'

export default function Home() {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const ref = useRef<ScrollView>(null)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={20}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <ScrollView
        ref={ref}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
          paddingBottom: bottom + 48,
          backgroundColor: theme.background,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <ProductForm />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
