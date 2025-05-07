import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(login)',
}

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(login)" />
    </Stack>
  )
}
