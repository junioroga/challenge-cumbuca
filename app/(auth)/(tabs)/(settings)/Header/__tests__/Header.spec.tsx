import { fireEvent, render } from '@/test/test-utils'
import Header from '../index'

const mockSetProductSearch = jest.fn()

// Mock do useAppStore
jest.mock('@/store', () => ({
  useAppStore: () => ({
    setProductSearch: mockSetProductSearch,
    productSearch: '',
  }),
}))

// Mock do useTheme
jest.mock('@/hooks/useTheme', () => () => ({
  background: '#FFFFFF',
}))

// Mock do AnimatedInput
jest.mock('@/components', () => {
  const { Text, TextInput } = require('react-native')
  return {
    AnimatedInput: ({ testID, onChangeText, ...props }: any) => (
      <TextInput testID={testID} onChange={onChangeText} {...props} />
    ),
    Text: ({ children, testID, ...props }: any) => (
      <Text testID={testID} {...props}>
        {children}
      </Text>
    ),
  }
})

jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native')
  const React = require('react')

  return {
    createAnimatedComponent: (Component: any) => {
      return React.forwardRef((props: any, ref: any) => {
        return <Component {...props} ref={ref} />
      })
    },
    FadeInUp: {
      delay: () => ({
        duration: () => ({
          springify: () => 'worklet',
        }),
      }),
    },
    View: View,
    default: {
      createAnimatedComponent: (Component: any) => {
        return React.forwardRef((props: any, ref: any) => {
          return <Component {...props} ref={ref} />
        })
      },
      View: View,
      addWhitelistedNativeProps: () => {},
    },
  }
})

describe('Header Component', () => {
  const setup = () => render(<Header />)

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render correctly with default props', () => {
    const { getByTestId } = setup()

    const title = getByTestId('test-title')
    const input = getByTestId('test-product-input')

    expect(title).toBeTruthy()
    expect(input).toBeTruthy()
  })

  it('should update search text when input changes', () => {
    const { getByTestId } = setup()
    const input = getByTestId('test-product-input')

    fireEvent.changeText(input, 'Test Product')

    expect(mockSetProductSearch).toHaveBeenCalledWith('Test Product')
    expect(mockSetProductSearch).toHaveBeenCalledTimes(1)
  })

  it('should handle empty input value', () => {
    const { getByTestId } = setup()
    const input = getByTestId('test-product-input')

    fireEvent.changeText(input, '')

    expect(mockSetProductSearch).toHaveBeenCalledWith('')
  })

  it('should maintain input value after multiple changes', () => {
    const { getByTestId } = setup()
    const input = getByTestId('test-product-input')

    fireEvent.changeText(input, 'First')
    fireEvent.changeText(input, 'Second')
    fireEvent.changeText(input, 'Third')

    expect(mockSetProductSearch).toHaveBeenCalledTimes(3)
    expect(mockSetProductSearch).toHaveBeenLastCalledWith('Third')
  })
})
