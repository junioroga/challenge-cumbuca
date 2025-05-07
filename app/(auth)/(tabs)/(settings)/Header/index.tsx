import { Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { supabase } from '@/lib/supabase'
import { useAppStore } from '@/store'
import { Alert, Pressable } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

export default function Header() {
  const theme = useTheme()
  const { setAuthUser, setFaceIdAccess } = useAppStore()

  const singOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      Alert.alert('Erro ao fazer logout', 'Tente novamente mais tarde.')
      return
    }

    setFaceIdAccess(false)
    setAuthUser(null)
  }

  const handleSingOut = () => {
    Alert.alert(
      'Deslogar',
      'Deseja realmente sair?',
      [
        {
          text: 'Sim',
          onPress: singOut,
          style: 'destructive',
        },
        {
          text: 'Nao',
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingBottom: 16,
      }}
      entering={FadeInUp.delay(50).duration(150).springify()}
    >
      <Text testID="test-title" style={{ fontSize: 22 }} fow={8}>
        Configurações
      </Text>
      <Pressable onPress={handleSingOut}>
        <Text fow={6}>Sair</Text>
      </Pressable>
    </Animated.View>
  )
}
