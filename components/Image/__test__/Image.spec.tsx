import { render } from '@/test/test-utils'
import { Image } from '../Image'

const mockSource = { uri: '@/assets/logo.png' }

describe('Image', () => {
  const setup = (props = {}) => render(<Image testID="test-image" source={mockSource} {...props} />)

  it('renders the image correctly', () => {
    const { getByTestId } = setup()
    const image = getByTestId('test-image')
    expect(image)
  })

  it('passes the source correctly to the component', () => {
    const { getByTestId } = setup()
    const image = getByTestId('test-image')
    expect(image.props.source).toEqual(mockSource)
  })

  it('accepts and applies custom styles', () => {
    const customStyle = { width: 100, height: 100 }
    const { getByTestId } = setup({ style: customStyle })
    const image = getByTestId('test-image')
    expect(image.props.style).toEqual(customStyle)
  })

  it('passes additional props correctly', () => {
    const { getByTestId } = setup({ resizeMode: 'cover' })
    const image = getByTestId('test-image')
    expect(image.props.resizeMode).toBe('cover')
  })
})
