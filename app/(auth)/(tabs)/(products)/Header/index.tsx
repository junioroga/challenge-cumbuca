import { AnimatedInput, Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { useAppStore } from '@/store'
import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

const AnimatedTitle = Animated.createAnimatedComponent(Text)

export default function Header() {
  const { setProductSearch, productSearch } = useAppStore()
  const theme = useTheme()

  return (
    <Animated.View
      style={{ backgroundColor: theme.background, padding: 16 }}
      entering={FadeInUp.delay(50).duration(150).springify()}
    >
      <AnimatedTitle testID="test-title" style={{ fontSize: 22 }} fow={8}>
        Produtos
      </AnimatedTitle>
      <View style={{ marginTop: 8 }}>
        <AnimatedInput
          testID="test-product-input"
          label="Produto"
          onChangeText={setProductSearch}
          value={productSearch}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="off"
          returnKeyType="done"
          clearButtonMode="always"
          inputMode="text"
        />
      </View>
    </Animated.View>
  )
}
