import useTheme from '@/hooks/useTheme'
import { getFontSize } from '@/utils/responsiveFontSize'
import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

export type InputProps = { fow?: number } & TextInputProps

export const Input = forwardRef(
  (
    { children, fow = 5, style, editable = true, ...rest }: InputProps,
    ref: React.LegacyRef<TextInput>
  ) => {
    const theme = useTheme()
    let fontSize = getFontSize(14)
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
      <TextInput
        ref={ref}
        style={[
          {
            fontFamily: fontWeight[fow],
            fontSize,
            borderWidth: 1.2,
            height: 47,
            borderRadius: 5,
            backgroundColor: theme.background,
            borderColor: theme.primaryPurple100,
            paddingHorizontal: 12,
            color: theme.primaryPurple100,
            opacity: editable ? 1 : 0.5,
          },
          style,
        ]}
        editable={editable}
        {...rest}
      >
        {children}
      </TextInput>
    )
  }
)
