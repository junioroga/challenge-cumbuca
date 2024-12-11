import { Text } from '../Text'

export type TabLabelProps = {
  label: string
  color: string
}

export const TabBarLabel = ({ label, color }: TabLabelProps) => {
  return (
    <Text style={{ color }} fow={6}>
      {label}
    </Text>
  )
}
