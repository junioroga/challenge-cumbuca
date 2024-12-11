import { themes } from '@/styles/themes'
import { render } from '@/test/test-utils'
import { fireEvent } from '@/test/test-utils'
import { Checkbox } from '../Checkbox'

jest.mock('@expo/vector-icons/MaterialIcons', () => 'Icon')

const mockOnCheckedChange = jest.fn()

describe('Checkbox', () => {
  const setup = (props = {}) =>
    render(<Checkbox testID="test-checkbox" onCheckedChange={mockOnCheckedChange} {...props} />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders checkbox unchecked by default', () => {
    const { getByTestId } = setup()
    const checkbox = getByTestId('test-checkbox')
    expect(checkbox)
  })

  it('render checkbox with primary variant by default', () => {
    const { getByTestId } = setup()
    const checkbox = getByTestId('test-checkbox')
    expect(checkbox?.props.style[0]).toHaveProperty('backgroundColor', themes.light.primaryPurple20)
  })

  it('renders checkbox with secondary variant when specified', () => {
    const { getByTestId } = setup({ variant: 'secondary' })
    const checkbox = getByTestId('test-checkbox')
    expect(checkbox?.props.style[0]).toHaveProperty('backgroundColor', themes.light.primaryOrange20)
  })

  it('calls the onCheckedChange function when pressed', () => {
    const { getByTestId } = setup()
    const checkbox = getByTestId('test-checkbox')

    fireEvent.press(checkbox)
    expect(mockOnCheckedChange).toHaveBeenCalledTimes(1)
    expect(mockOnCheckedChange).toHaveBeenCalledWith(true)
  })

  it('renders the check icon when it is checked', () => {
    const { getByTestId } = setup({ checked: true })
    const icon = getByTestId('test-icon')

    expect(icon)
  })

  it('does not render the check icon when it is unchecked', () => {
    const { getByTestId } = setup({ checked: false })
    const checkbox = getByTestId('test-checkbox')
    expect(checkbox.props.children[0]).toEqual(false)
  })
})
