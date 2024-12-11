import useTheme from '@/hooks/useTheme'
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

type ButtonProps = {
  checked?: boolean
  onCheckedChange: (checked: boolean) => void
  variant?: 'primary' | 'secondary'
  style?: StyleProp<ViewStyle>
} & RNPressableProps

export const Checkbox = ({
  checked,
  onCheckedChange,
  variant = 'primary',
  style,
  ...rest
}: ButtonProps) => {
  const theme = useTheme()

  const color = variant === 'primary' ? theme.primaryPurple20 : theme.primaryOrange20

  return (
    <RNPressable
      style={[
        {
          height: 30,
          width: 30,
          backgroundColor: color,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={() => onCheckedChange(!checked)}
      {...rest}
    >
      {checked && (
        <MaterialIcons
          testID="test-icon"
          name="check"
          size={25}
          color={variant === 'primary' ? theme.primaryOrange100 : theme.primaryPurple100}
        />
      )}
    </RNPressable>
  )
}
