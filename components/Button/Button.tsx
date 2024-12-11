import useTheme from '@/hooks/useTheme'
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { Text } from '../Text'

type ButtonProps = {
  label?: string
  variant?: 'primary' | 'secondary'
  style?: StyleProp<ViewStyle>
} & RNPressableProps

export const Button = ({
  children,
  variant = 'primary',
  label,
  style,
  disabled,
  ...rest
}: ButtonProps) => {
  const theme = useTheme()

  const color = variant === 'primary' ? theme.primaryPurple80 : theme.primaryOrange80

  return (
    <RNPressable
      style={[
        {
          height: 47,
          width: '100%',
          backgroundColor: color,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      {label ? (
        <Text style={{ color: 'white', fontSize: 16 }} fow={6}>
          {label}
        </Text>
      ) : (
        children
      )}
    </RNPressable>
  )
}
