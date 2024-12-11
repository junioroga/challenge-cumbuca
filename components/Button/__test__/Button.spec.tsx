import { themes } from '@/styles/themes'
import { render } from '@/test/test-utils'
import { fireEvent } from '@/test/test-utils'
import { View } from 'react-native'
import { Button } from '../index'

const mockOnPress = jest.fn()

describe('Button', () => {
  const setup = (props = {}) =>
    render(<Button label="Test Button" testID="test-button" onPress={mockOnPress} {...props} />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the button with the label correctly', () => {
    const { getByText } = setup()
    expect(getByText('Test Button'))
  })

  it('render button with primary variant by default', () => {
    const { getByTestId } = setup()
    const button = getByTestId('test-button')

    expect(button?.props.style[0]).toHaveProperty('backgroundColor', themes.light.primaryPurple80)
  })

  it('render button with secondary variant when specified', () => {
    const { getByTestId } = setup({ variant: 'secondary' })
    const button = getByTestId('test-button')
    expect(button?.props.style[0]).toHaveProperty('backgroundColor', themes.light.primaryOrange80)
  })

  it('calls the onPress function when pressed', () => {
    const { getByTestId } = setup()
    const button = getByTestId('test-button')

    fireEvent.press(button)
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('render children when there is no label', () => {
    const { getByTestId } = render(
      <Button>
        <View testID="custom-content" />
      </Button>
    )

    expect(getByTestId('custom-content')).toBeTruthy()
  })
})
