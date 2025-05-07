import { Image, Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import Animated, { FadeInUp } from 'react-native-reanimated'
export default function Header() {
  const theme = useTheme()

  return (
    <Animated.View
      entering={FadeInUp.delay(50).duration(150).springify()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingBottom: 16,
      }}
    >
      <Text style={{ fontSize: 22 }} fow={8}>
        Challenge
      </Text>
      <Image
        testID="image-logo"
        source={require('@/assets/logo.png')}
        style={{
          height: 30,
          width: 30,
        }}
      />
    </Animated.View>
  )
}
