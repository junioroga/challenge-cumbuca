import useTheme from '@/hooks/useTheme'
import { getFontSize } from '@/utils/responsiveFontSize'
import { forwardRef } from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import Animated, { AnimatedProps } from 'react-native-reanimated'

const AnimatedText = Animated.createAnimatedComponent(RNText)

type TextProps = {
  fow?: number
  variant?: 'primary' | 'secondary'
} & RNTextProps

export const Text = forwardRef(
  (
    { children, fow = 4, variant = 'primary', style, ...rest }: AnimatedProps<TextProps>,
    ref: React.LegacyRef<RNText>
  ) => {
    let fontSize = getFontSize(14)
    const theme = useTheme()
    const fontWeight: Record<number, string> = {
      1: 'Montserrat_100Thin',
      2: 'Montserrat_200ExtraLight',
      3: 'Montserrat_300Light',
      4: 'Montserrat_400Regular',
      5: 'Montserrat_500Medium',
      6: 'Montserrat_600SemiBold',
      7: 'Montserrat_700Bold',
      8: 'Montserrat_800ExtraBold',
      9: 'Montserrat_900Black',
    }

    const color = variant === 'primary' ? theme.primaryPurple100 : theme.primaryOrange100

    if (style) {
      if (style instanceof Array) {
        style.forEach((s) => {
          if (s && typeof s === 'object' && 'fontSize' in s && s.fontSize !== undefined) {
            fontSize = getFontSize(s.fontSize)
          }
        })
      } else if (typeof style === 'object' && 'fontSize' in style && style.fontSize !== undefined) {
        fontSize = getFontSize(style.fontSize)
      }
    }

    return (
      <AnimatedText
        ref={ref}
        style={[{ fontFamily: fontWeight[fow], fontSize, color }, style]}
        {...rest}
      >
        {children}
      </AnimatedText>
    )
  }
)
