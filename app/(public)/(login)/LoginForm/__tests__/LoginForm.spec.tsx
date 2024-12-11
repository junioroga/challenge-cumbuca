import { act, fireEvent, render, waitFor } from '@/test/test-utils'
import LoginForm, { LoginFormProps } from '../index'

const onSubmitMock = jest.fn()

describe('LoginForm', () => {
  const setup = (props: Omit<LoginFormProps, 'onSubmitForm'>) =>
    render(<LoginForm {...props} onSubmitForm={onSubmitMock} />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render the form correctly', () => {
    const { getByTestId } = setup({})

    expect(getByTestId('login-form'))
  })

  it('should display an error message when the email is invalid', async () => {
    const { getByTestId, findByText } = setup({})

    const cpfInput = getByTestId('cpf-input')

    act(() => {
      fireEvent.changeText(cpfInput, '00000000000')
      fireEvent(cpfInput, 'blur')
    })

    const errorMessage = await findByText('CPF informado é inválido')
    expect(errorMessage).toBeTruthy()
  })

  it('should display error message when password is too short', async () => {
    const { getByTestId, findByText } = setup({})

    const passwordInput = getByTestId('password-input')

    act(() => {
      fireEvent.changeText(passwordInput, '123')
      fireEvent(passwordInput, 'blur')
    })

    const errorMessage = await findByText('A senha deve ter pelo menos 8 caracteres')
    expect(errorMessage).toBeTruthy()
  })

  it('should call the submit function when the form is valid', async () => {
    const { getByTestId } = setup({})

    const cpfInput = getByTestId('cpf-input')
    const passwordInput = getByTestId('password-input')
    const submitButton = getByTestId('submit-button')

    await act(async () => {
      fireEvent.changeText(cpfInput, '38548288027')
      fireEvent(cpfInput, 'blur')
      fireEvent.changeText(passwordInput, '12345678')
      fireEvent(passwordInput, 'blur')
    })

    await waitFor(() => expect(submitButton.props.accessibilityState.disabled).toEqual(false))

    await act(() => {
      fireEvent(submitButton, 'press')
    })

    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
