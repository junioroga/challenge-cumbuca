import { render } from '@/test/test-utils'
import { TabBarLabel, TabLabelProps } from '../TabBarLabel'

describe('TabBarLabel', () => {
  const setup = (props: TabLabelProps) => render(<TabBarLabel {...props} />)

  it('should render correctly with the provided props', () => {
    const label = 'Home'
    const color = '#000000'

    const { getByText } = setup({ label, color })

    const labelElement = getByText(label)
    expect(labelElement).toBeTruthy()
    expect(labelElement.props.style[1]).toEqual(expect.objectContaining({ color }))
  })

  it('should apply the color style correctly', () => {
    const label = 'Settings'
    const color = '#FF0000'

    const { getByText } = setup({ label, color })

    const labelElement = getByText(label)
    expect(labelElement.props.style[1]).toEqual(expect.objectContaining({ color }))
  })
})
