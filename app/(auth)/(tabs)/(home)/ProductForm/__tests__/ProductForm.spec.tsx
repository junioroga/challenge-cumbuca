import { useAppStore } from '@/store'
import { act, fireEvent, render, waitFor } from '@/test/test-utils'
import { Alert, View as MockView, ViewProps } from 'react-native'
import ProductForm from '..'

jest.mock('@/store', () => ({
  useAppStore: jest.fn(),
}))

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}))

jest.mock('@/components', () => {
  const React = require('react')
  return {
    AnimatedInput: React.forwardRef((props: ViewProps, ref: React.LegacyRef<MockView>) => (
      <MockView ref={ref} {...props} />
    )),
    Button: (props: ViewProps) => <MockView {...props} />,
  }
})

const mockAddProduct = jest.fn()

describe('ProductForm', () => {
  const setup = () => render(<ProductForm />)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({
      products: [],
      addProduct: mockAddProduct,
    })
  })

  it('should render all form fields', async () => {
    const { getByTestId } = setup()

    await act(async () => {
      expect(getByTestId('test-name-input'))
      expect(getByTestId('test-quantity-input'))
      expect(getByTestId('test-unity-value-input'))
      expect(getByTestId('test-total-value-input'))
      expect(getByTestId('button-save'))
    })
  })

  it('should update the fields correctly when typing', async () => {
    const { getByTestId } = setup()

    const nameInput = getByTestId('test-name-input')
    const quantityInput = getByTestId('test-quantity-input')
    const unityValueInput = getByTestId('test-unity-value-input')

    await act(async () => {
      fireEvent.changeText(nameInput, 'Produto Teste')
      fireEvent.changeText(quantityInput, '2')
      fireEvent.changeText(unityValueInput, '10,00')
    })

    expect(nameInput.props.value).toBe('Produto Teste')
    expect(quantityInput.props.value).toBe('2')
    expect(unityValueInput.props.value).toBe('10,00')
  })

  it('should calculate the total amount correctly', async () => {
    const { getByTestId } = setup()

    const quantityInput = getByTestId('test-quantity-input')
    const unityValueInput = getByTestId('test-unity-value-input')
    const totalValueInput = getByTestId('test-total-value-input')

    await act(async () => {
      fireEvent.changeText(quantityInput, '2')
      fireEvent.changeText(unityValueInput, '10,00')
    })

    expect(totalValueInput.props.value).toBe('20,00')
  })

  it('should call addProduct with the correct data when submitting the form', async () => {
    const { getByTestId } = setup()

    const nameInput = getByTestId('test-name-input')
    const quantityInput = getByTestId('test-quantity-input')
    const unityValueInput = getByTestId('test-unity-value-input')
    const saveButton = getByTestId('button-save')

    await act(async () => {
      fireEvent.changeText(nameInput, 'Produto Teste')
      fireEvent.changeText(quantityInput, '2')
      fireEvent.changeText(unityValueInput, '10.00')
    })

    await waitFor(() => expect(saveButton.props.disabled).toEqual(false))

    await act(async () => {
      fireEvent.press(saveButton)
    })

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith({
        id: 1,
        name: 'Produto Teste',
        quantity: 2,
        unityValue: 10,
        totalValue: 20,
      })
      expect(Alert.alert).toHaveBeenCalledWith(
        'Produto adicionado',
        'O produto foi adicionado com sucesso',
        expect.any(Array)
      )
    })
  })

  it('should disable the button when the form is invalid', () => {
    const { getByTestId } = setup()
    const saveButton = getByTestId('button-save')

    expect(saveButton.props.disabled)
  })
})
