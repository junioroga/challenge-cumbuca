import { Image, Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { View } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

const AnimatedTitle = Animated.createAnimatedComponent(Text)
export default function Header() {
  const theme = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingBottom: 16,
      }}
    >
      <AnimatedTitle
        style={{ fontSize: 22 }}
        fow={8}
        entering={FadeInUp.delay(50).duration(150).springify()}
      >
        Challenge
      </AnimatedTitle>
      <Image
        testID="image-logo"
        entering={FadeInUp.delay(150).duration(150).springify()}
        source={require('@/assets/logo.png')}
        style={{
          height: 35,
          width: 35,
        }}
      />
    </View>
  )
}
