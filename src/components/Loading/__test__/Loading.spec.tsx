import { themes } from '@/styles/themes'
import { render } from '@/test/test-utils'
import { Loading } from '../Loading'

describe('Loading', () => {
  const setup = (props = {}) =>
    render(<Loading testID="test-loading" variant="primary" {...props} />)

  it('renders loading correctly', () => {
    const { getByTestId } = setup()
    expect(getByTestId('test-loading'))
  })

  it('renders with primary color when variant is primary', () => {
    const { getByTestId } = setup()
    const loading = getByTestId('test-loading')
    expect(loading.props.color).toBe(themes.light.primaryPurple100)
  })

  it('renders with the secondary color when variant is secondary', () => {
    const { getByTestId } = setup({ variant: 'secondary' })
    const loading = getByTestId('test-loading')
    expect(loading.props.color).toBe(themes.light.primaryOrange100)
  })

  it('accepts and applies additional props correctly', () => {
    const { getByTestId } = setup({ size: 'large' })
    const loading = getByTestId('test-loading')
    expect(loading.props.size).toBe('large')
  })
})
