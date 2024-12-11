import { useEffect } from 'react'

import useTheme from '@/hooks/useTheme'
import { View } from 'react-native'
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Image } from '../Image'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)

type Props = {
  setIsReady: (value: boolean) => void
}

export const SplashScreen = ({ setIsReady }: Props) => {
  const insets = useSafeAreaInsets()
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)
  const scaleImage = useSharedValue(1)
  const theme = useTheme()

  const navigationToHome = () => {
    setTimeout(() => setIsReady(true), 1800)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    translateYImage.value = withDelay(
      700,
      withTiming(insets.bottom ? 10 : 7, {
        duration: 700,
        easing: Easing.linear,
      })
    )

    translateYText.value = withDelay(
      700,
      withTiming(
        5.5,
        {
          duration: 700,
          easing: Easing.linear,
        },
        () => {
          runOnJS(navigationToHome)()
          scaleImage.value = withDelay(
            1500,
            withTiming(4, {
              duration: 700,
              easing: Easing.linear,
            })
          )
        }
      )
    )
  }, [runOnJS, insets.bottom])

  const animatedStackStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scaleImage.value, [1, 4], [1, 0], Extrapolation.CLAMP),
      transform: [{ scale: scaleImage.value }],
    }
  })

  return (
    <View
      testID="test-splash-screen"
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.background,
      }}
    >
      <Animated.View
        style={[animatedStackStyle, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}
      >
        <Image
          testID="splash-screen-logo"
          entering={FadeIn.delay(300).duration(700)}
          source={require('@/assets/logo.png')}
          style={{
            height: 150,
            width: 150,
            transform: [{ translateY: translateYImage }],
          }}
        />
        <AnimatedText
          fow={7}
          entering={FadeIn.delay(300).duration(700)}
          style={{
            fontSize: 24,
            transform: [{ translateY: translateYText }],
          }}
        >
          CHALLENGE
        </AnimatedText>
      </Animated.View>
    </View>
  )
}
