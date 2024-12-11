import { Product } from '@/store'
import { fireEvent, render } from '@/test/test-utils'
import Card from '../index'

jest.mock('@expo/vector-icons/MaterialIcons', () => 'Icon')

describe('Card', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Produto Teste',
    quantity: 99,
    unityValue: 10.0,
    totalValue: 990.0,
  }

  const mockOnRemove = jest.fn()
  const mockOnEdit = jest.fn()

  const setup = ({ item = mockProduct } = {}) =>
    render(
      <Card
        onLongPress={jest.fn()}
        index={0}
        item={item}
        onRemove={mockOnRemove}
        onEdit={mockOnEdit}
      />
    )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders product information correctly', () => {
    const { getByText } = setup()

    expect(getByText('Produto Teste'))
    expect(getByText('99'))
    expect(getByText('10,00'))
    expect(getByText('990,00'))
  })

  it('calls onEdit when increasing quantity', () => {
    const { getByTestId } = setup()

    fireEvent.press(getByTestId('increase-button'))

    expect(mockOnEdit).toHaveBeenCalledWith({
      ...mockProduct,
      quantity: 100,
      totalValue: 1000,
    })
  })

  it('calls onEdit when decreasing quantity when quantity > 1', () => {
    const { getByTestId } = setup()

    fireEvent.press(getByTestId('subtract-button'))

    expect(mockOnEdit).toHaveBeenCalledWith({
      ...mockProduct,
      quantity: 98,
      totalValue: 980,
    })
  })

  it('calls onRemove when decrementing when quantity = 1', () => {
    const productWithQuantityOne = { ...mockProduct, quantity: 1, totalValue: 10.0 }
    const { getByTestId } = setup({ item: productWithQuantityOne })

    const deleteIcon = getByTestId('test-delete-subtract')
    fireEvent.press(deleteIcon)

    expect(mockOnRemove).toHaveBeenCalled()
    expect(mockOnEdit).not.toHaveBeenCalled()
  })
})
