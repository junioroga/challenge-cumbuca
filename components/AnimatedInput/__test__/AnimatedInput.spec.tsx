import { act, fireEvent, render } from '@/test/test-utils'
import { AnimatedInput } from '../AnimatedInput'

jest.mock('@/hooks/useTheme', () => ({
  __esModule: true,
  default: () => ({
    colorTransparent: 'transparent',
    background: '#FFFFFF',
    primaryOrange70: '#FF7043',
  }),
}))

const mockProps = {
  label: 'Nome',
  value: '',
  onChangeText: jest.fn(),
}

describe('AnimatedInput', () => {
  const setup = (props: any) => render(<AnimatedInput {...mockProps} {...props} />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the component correctly', () => {
    const { getByText } = setup({})

    expect(getByText('Nome'))
  })

  it('should display error text when provided', () => {
    const { getByText } = setup({ error: 'Campo obrigatório' })

    expect(getByText('Campo obrigatório'))
  })

  it('should call onFocus when the input receives focus', () => {
    const onFocusMock = jest.fn()
    const { getByTestId } = setup({
      error: 'Campo obrigatório',
      onFocus: onFocusMock,
      testID: 'animated-input',
    })

    act(() => {
      fireEvent(getByTestId('animated-input'), 'focus')
    })

    expect(onFocusMock).toHaveBeenCalled()
  })

  it('should call onBlur when the input loses focus', () => {
    const onBlurMock = jest.fn()
    const { getByTestId } = setup({
      error: 'Campo obrigatório',
      onBlur: onBlurMock,
      testID: 'animated-input',
    })

    act(() => {
      fireEvent(getByTestId('animated-input'), 'blur')
    })

    expect(onBlurMock).toHaveBeenCalled()
  })

  it('should keep the label animated when there is value', () => {
    const { getByText } = setup({
      value: 'João',
    })

    const label = getByText('Nome')
    expect(label)
  })

  it('should not render label when not provided', () => {
    const { queryByText } = setup({
      label: '',
    })

    expect(queryByText('Nome')).toBeNull()
  })
})
