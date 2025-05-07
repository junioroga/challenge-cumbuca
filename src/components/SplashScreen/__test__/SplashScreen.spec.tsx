import { render } from '@/test/test-utils'
import { SplashScreen } from '../SplashScreen'

const mockSetIsReady = jest.fn()
describe('SplashScreen', () => {
  const setup = (props = {}) => render(<SplashScreen setIsReady={mockSetIsReady} {...props} />)

  it('renders the splash screen correctly', () => {
    const { getByTestId } = setup()
    expect(getByTestId('test-splash-screen'))
  })

  it('renders the logo image correctly', () => {
    const { getByTestId } = setup()
    expect(getByTestId('splash-screen-logo'))
  })
})
