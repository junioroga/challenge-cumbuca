import { render } from '@/test/test-utils'
import { fireEvent } from '@/test/test-utils'
import { Input } from '../index'

describe('Input', () => {
  const mockOnChangeText = jest.fn()

  const setup = (props = {}) =>
    render(<Input testID="test-input" onChangeText={mockOnChangeText} {...props} />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the input correctly', () => {
    const { getByTestId } = setup()
    expect(getByTestId('test-input'))
  })

  it('calls the onChangeText function when the text changes', () => {
    const { getByTestId } = setup()
    const input = getByTestId('test-input')

    fireEvent.changeText(input, 'novo texto')
    expect(mockOnChangeText).toHaveBeenCalledTimes(1)
    expect(mockOnChangeText).toHaveBeenCalledWith('novo texto')
  })

  it('accepts and applies custom styles', () => {
    const customStyle = { borderWidth: 2, borderColor: 'red' }
    const { getByTestId } = setup({ style: customStyle })
    const input = getByTestId('test-input')
    expect(input.props.style).toContainEqual(customStyle)
  })

  it('passes additional props correctly', () => {
    const placeholder = 'Digite aqui...'
    const { getByPlaceholderText } = setup({ placeholder })
    expect(getByPlaceholderText(placeholder)).toBeTruthy()
  })
})
