import useTheme from '@/hooks/useTheme'
import {
  ActivityIndicator,
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
  loading?: boolean
} & RNPressableProps

export const Button = ({
  children,
  variant = 'primary',
  label,
  style,
  loading = false,
  disabled,
  ...rest
}: ButtonProps) => {
  const theme = useTheme()
  const isDisabled = disabled || loading

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
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : label ? (
        <Text style={{ color: 'white', fontSize: 16 }} fow={6}>
          {label}
        </Text>
      ) : (
        children
      )}
    </RNPressable>
  )
}
