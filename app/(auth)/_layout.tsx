import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  )
}
