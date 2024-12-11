import { Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { Product } from '@/store'
import { formatCurrency } from '@brazilian-utils/brazilian-utils'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Alert, Pressable, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

const AnimatedButton = Animated.createAnimatedComponent(Pressable)

export type CardProps = {
  index: number
  item: Product
  onRemove: () => void
  onEdit: (product: Product) => void
  onLongPress: () => void
  disabled?: boolean
}

export default function Card({ index, item, onRemove, onEdit, onLongPress, disabled }: CardProps) {
  const theme = useTheme()
  const handleSubtract = () => {
    if (item.quantity === 1) {
      onRemove()
    } else {
      onEdit({
        ...item,
        quantity: item.quantity - 1,
        totalValue: item.unityValue * (item.quantity - 1),
      })
    }
  }

  const handleSum = () => {
    onEdit({
      ...item,
      quantity: item.quantity + 1,
      totalValue: item.unityValue * (item.quantity + 1),
    })
  }

  const handleRemove = () => {
    Alert.alert(
      'Remover Produto',
      'Deseja remover o produto?',
      [
        {
          text: 'Sim',
          onPress: () => onRemove(),
          style: 'destructive',
        },
        {
          text: 'Não',
        },
      ],
      { cancelable: false }
    )
  }

  return (
    <AnimatedButton
      onLongPress={onLongPress}
      style={{
        flex: 1,
        backgroundColor: disabled ? theme.backgroundPress : theme.background,
        shadowColor: theme.shadowColor,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius: 8,
      }}
      disabled={disabled}
      entering={FadeInUp.delay(100 * index)
        .duration(50 * index)
        .springify()}
      exiting={FadeOutUp.duration(100).springify()}
    >
      <View style={{ flex: 1, padding: 12 }}>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }} testID="name" fow={6}>
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.primaryPurple10,
                borderRadius: 8,
              }}
            >
              <Pressable
                testID="subtract-button"
                style={{
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleSubtract}
              >
                {item.quantity === 1 ? (
                  <MaterialIcons
                    testID="test-delete-subtract"
                    name="delete"
                    size={16}
                    color={theme.primaryPurple100}
                  />
                ) : (
                  <Text fow={6} style={{ fontSize: 22 }}>
                    -
                  </Text>
                )}
              </Pressable>
              <Text variant="secondary" testID="quantity" fow={5}>
                {item.quantity}
              </Text>
              <Pressable
                testID="increase-button"
                style={{
                  height: 35,
                  width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleSum}
              >
                <Text fow={5}>+</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text fow={6} variant="secondary">
                  Valor unitário:
                </Text>
                <Text testID="unityValue" fow={5}>
                  {formatCurrency(item.unityValue)}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text fow={6} variant="secondary">
                  Valor total:
                </Text>
                <Text testID="totalValue" fow={5}>
                  {formatCurrency(item.totalValue)}
                </Text>
              </View>
            </View>
            <Pressable onPress={handleRemove}>
              <MaterialIcons name="delete" size={22} color={theme.primaryOrange100} />
            </Pressable>
          </View>
        </View>
      </View>
    </AnimatedButton>
  )
}
