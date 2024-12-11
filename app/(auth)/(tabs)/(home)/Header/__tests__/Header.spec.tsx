import { render } from '@/test/test-utils'

import Header from '../index'

describe('Header', () => {
  const setup = () => render(<Header />)

  it('renders title and logo', () => {
    const { getByText, getByTestId } = setup()

    expect(getByText('Challenge'))
    expect(getByTestId('image-logo'))
  })
})
