import { useEffect } from 'react'

import useTheme from '@/hooks/useTheme'
import { useAppStore } from '@/store'
import { StyleSheet, View } from 'react-native'
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Image } from '../Image'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)

const SCALE_TARGET = 4
const DURATION = 1500
const DURATION_SCALE = 600
const TRANSLATE_TARGET = 0

export const SplashScreen = () => {
  const { setIsReady } = useAppStore()
  const translateYImage = useSharedValue(-100)
  const translateYText = useSharedValue(100)
  const scaleImage = useSharedValue(1)
  const theme = useTheme()

  const handleNavigate = () => {
    setTimeout(() => setIsReady(true), 300)
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    translateYImage.value = withTiming(TRANSLATE_TARGET, {
      duration: DURATION,
      easing: Easing.out(Easing.exp),
    })

    translateYText.value = withTiming(
      TRANSLATE_TARGET,
      {
        duration: DURATION,
        easing: Easing.out(Easing.exp),
      },
      () => {
        runOnJS(handleNavigate)()
        scaleImage.value = withTiming(SCALE_TARGET, {
          duration: DURATION_SCALE,
          easing: Easing.linear,
        })
      }
    )
  }, [scaleImage, setIsReady])

  const animatedStackStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scaleImage.value, [1, 4], [1, 0], Extrapolation.CLAMP),
    transform: [{ scale: scaleImage.value }],
  }))

  const animatedImageStyle = useAnimatedStyle(() => ({
    height: 150,
    width: 150,
    transform: [{ translateY: translateYImage.value }],
    opacity: interpolate(translateYImage.value, [-100, 0], [0, 1], Extrapolation.CLAMP),
  }))

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: 24,
    transform: [{ translateY: translateYText.value }],
    opacity: interpolate(translateYText.value, [100, 0], [0, 1], Extrapolation.CLAMP),
  }))

  return (
    <View
      testID="test-splash-screen"
      style={{
        flex: 1,
        backgroundColor: theme.background,
        ...StyleSheet.absoluteFillObject,
      }}
    >
      <Animated.View
        style={[animatedStackStyle, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}
      >
        <Image
          testID="splash-screen-logo"
          source={require('@/assets/logo.png')}
          style={animatedImageStyle}
        />
        <AnimatedText fow={7} style={animatedTextStyle}>
          CHALLENGE
        </AnimatedText>
      </Animated.View>
    </View>
  )
}
