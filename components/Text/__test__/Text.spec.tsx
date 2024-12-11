import { render } from '@/test/test-utils'
import { Text } from '../Text'

describe('Text', () => {
  const setup = (props = {}) =>
    render(
      <Text {...props} testID="test-text">
        Test Text
      </Text>
    )

  it('should render correctly with default props', () => {
    const { getByTestId } = setup()
    const textElement = getByTestId('test-text')
    expect(textElement)
  })

  it('should apply correct font style when fow is given', () => {
    const { getByTestId } = setup({ fow: 6 })
    const textElement = getByTestId('test-text')
    expect(textElement.props.style[0]).toEqual(
      expect.objectContaining({ fontFamily: 'Montserrat_600SemiBold' })
    )
  })

  it('should apply custom styles when provided', () => {
    const customStyle = { color: '#FF0000', fontSize: 20 }
    const { getByTestId } = setup({ style: customStyle })
    const textElement = getByTestId('test-text')
    expect(textElement.props.style[1]).toEqual(expect.objectContaining(customStyle))
  })

  it('should combine default styles with custom styles', () => {
    const customStyle = { color: '#FF0000' }
    const { getByTestId } = setup({ fow: 4, style: customStyle })
    const textElement = getByTestId('test-text')
    expect(textElement.props.style[0]).toEqual(
      expect.objectContaining({ fontFamily: 'Montserrat_400Regular' })
    )
    expect(textElement.props.style[1]).toEqual(expect.objectContaining(customStyle))
  })
})
