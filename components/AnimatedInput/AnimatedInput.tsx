import React, { forwardRef, useEffect } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData, View } from 'react-native'

import Animated, {
  AnimatedProps,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import useTheme from '@/hooks/useTheme'
import { Input, InputProps } from '../Input'
import { Text } from '../Text'

const AnimatedText = Animated.createAnimatedComponent(Text)
const AnimatedInputComponent = Animated.createAnimatedComponent(Input)

export type AnimatedInputProps = AnimatedProps<InputProps> & {
  label: string
  error?: string
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
}

export const AnimatedInput = forwardRef(
  (
    { error, label, value, entering, onFocus, onBlur, ...rest }: AnimatedInputProps,
    ref: React.LegacyRef<TextInput>
  ) => {
    const theme = useTheme()
    const topAnimated = useSharedValue(value ? -11 : 15)
    const leftAnimated = useSharedValue(value ? 6 : 14)
    const backgroundColor = useSharedValue(value ? theme.background : theme.colorTransparent)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      topAnimated.value = withTiming(value ? -11 : 15, {
        duration: 200,
        easing: Easing.linear,
      })

      leftAnimated.value = withTiming(value ? 6 : 14, {
        duration: 200,
        easing: Easing.linear,
      })

      backgroundColor.value = withTiming(value ? theme.background : theme.colorTransparent, {
        duration: 200,
        easing: Easing.linear,
      })
    }, [value, theme])

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onFocus) {
        onFocus(e)
      }

      topAnimated.value = withTiming(-11, {
        duration: 200,
        easing: Easing.linear,
      })

      leftAnimated.value = withTiming(6, {
        duration: 200,
        easing: Easing.linear,
      })

      backgroundColor.value = withTiming(theme.background, {
        duration: 200,
        easing: Easing.linear,
      })
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (onBlur) {
        onBlur(e)
      }

      if (!value) {
        topAnimated.value = withTiming(15, {
          duration: 200,
          easing: Easing.linear,
        })

        leftAnimated.value = withTiming(14, {
          duration: 200,
          easing: Easing.linear,
        })

        backgroundColor.value = withTiming(theme.colorTransparent, {
          duration: 200,
          easing: Easing.linear,
        })
      }
    }

    const animatedStyle = useAnimatedStyle(() => {
      return {
        backgroundColor: backgroundColor.value,
        top: topAnimated.value,
        left: leftAnimated.value,
      }
    })

    return (
      <View style={{ marginVertical: 8 }}>
        <AnimatedInputComponent
          ref={ref}
          value={value}
          entering={entering}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {label && (
          <View style={{ position: 'absolute', alignSelf: 'flex-start', pointerEvents: 'none' }}>
            <AnimatedText entering={entering} style={[animatedStyle, { pointerEvents: 'none' }]}>
              {label}
            </AnimatedText>
          </View>
        )}
        {error && (
          <AnimatedText style={{ paddingTop: 8, color: theme.primaryOrange70 }}>
            {error}
          </AnimatedText>
        )}
      </View>
    )
  }
)
