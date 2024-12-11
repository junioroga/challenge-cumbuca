import { Tabs } from 'expo-router'

import { TabBar } from '@/components'

export const unstable_settings = {
  initialRouteName: '(home)',
}

export default function TabLayout() {
  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Início',
        }}
      />
      <Tabs.Screen
        name="(products)"
        options={{
          title: 'Produtos',
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  )
}
