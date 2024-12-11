import useTheme from '@/hooks/useTheme'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

type LoadingProps = {
  variant: 'primary' | 'secondary'
} & ActivityIndicatorProps

export const Loading = ({ variant, ...rest }: LoadingProps) => {
  const theme = useTheme()

  return (
    <ActivityIndicator
      color={variant === 'primary' ? theme.primaryPurple100 : theme.primaryOrange100}
      {...rest}
    />
  )
}
