import { useCallback, useMemo } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Empty from '@/assets/svg/empty.svg'
import { Text } from '@/components'
import useTheme from '@/hooks/useTheme'
import { Product, useAppStore } from '@/store'
import Card from './Card'
import Header from './Header'

import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
import { LinearTransition } from 'react-native-reanimated'

export default function ProductsList() {
  const { products, removeProduct, editProduct, productSearch, setProducts } = useAppStore()
  const { width } = useWindowDimensions()
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()

  const renderItem = useCallback(
    ({ item, drag, isActive, getIndex }: RenderItemParams<Product>) => (
      <ScaleDecorator>
        <Card
          index={getIndex() || 0}
          item={item}
          disabled={isActive}
          onRemove={() => removeProduct(item.id)}
          onEdit={(product) => editProduct(product)}
          onLongPress={drag}
        />
      </ScaleDecorator>
    ),
    [removeProduct, editProduct]
  )

  const renderSeparator = useCallback(() => <View style={{ marginVertical: 8 }} />, [])

  const renderEmpty = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 8,
          gap: 16,
        }}
      >
        <Empty height={width / 2} />
        <Text fow={5} style={{ textAlign: 'center' }}>
          Sem produtos para listar
        </Text>
      </View>
    ),
    [width]
  )

  const keyExtractor = useCallback((item: Product) => String(item.id), [])

  const filteredProducts = useMemo(
    () => products.filter((product) => product.name.includes(productSearch)),
    [productSearch, products]
  )

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Header />
      <DraggableFlatList
        data={filteredProducts}
        onDragEnd={({ data }) => setProducts(data)}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        initialNumToRender={10}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 8,
          paddingHorizontal: 16,
          paddingBottom: bottom + 240,
          backgroundColor: theme.background,
        }}
        keyboardDismissMode="on-drag"
        itemLayoutAnimation={LinearTransition}
      />
    </View>
  )
}
