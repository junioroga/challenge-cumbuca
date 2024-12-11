import React, { useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import FontAwesome from '@expo/vector-icons/FontAwesome'
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)

type Props = {
  onPress: () => void
  onLongPress: () => void
  isFocused: boolean
  label:
    | string
    | ((props: {
        focused: boolean
        color: string
        position: LabelPosition
        children: string
      }) => React.ReactNode)
  routeName: string
  color: string
}

type Icon = {
  color: string
  isFocused: boolean
}

type Icons = {
  [key: string]: (props: { isFocused: boolean; color: string }) => React.ReactNode
}

export const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  label,
  routeName,
  color,
}: Props) => {
  const scale = useSharedValue(0)

  const icons: Icons = {
    '(home)': ({ color }: Icon) => <FontAwesome name="home" size={22} color={color} />,
    '(products)': ({ color }: Icon) => <FontAwesome name="filter" size={22} color={color} />,
    '(settings)': ({ color }: Icon) => <FontAwesome name="cog" size={22} color={color} />,
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      duration: 350,
    })
  }, [isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      opacity,
    }
  })

  return (
    <Pressable style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({
          color,
          isFocused,
        })}
      </Animated.View>
      <AnimatedText fow={6} style={[animatedTextStyle, { color }]}>
        {label as string}
      </AnimatedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
})
