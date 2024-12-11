import { useAppStore } from '@/store'
import { themes } from '@/styles/themes'
import { renderHook } from '@/test/test-utils'
import useTheme from './useTheme'

jest.mock('@/store', () => ({
  useAppStore: jest.fn(),
}))

describe('useTheme', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve retornar o tema correto baseado no tema do store', () => {
    const mockTheme = 'dark'
    ;(useAppStore as unknown as jest.Mock).mockReturnValue({ theme: mockTheme })

    const { result } = renderHook(() => useTheme())

    expect(result.current).toBe(themes[mockTheme])
  })

  it('deve atualizar o tema quando o tema do store mudar', () => {
    const initialTheme = 'light'
    const updatedTheme = 'dark'
    ;(useAppStore as unknown as jest.Mock).mockReturnValueOnce({ theme: initialTheme })
    const { result, rerender } = renderHook(() => useTheme())

    expect(result.current).toBe(themes[initialTheme])
    ;(useAppStore as unknown as jest.Mock).mockReturnValueOnce({ theme: updatedTheme })
    rerender({})

    expect(result.current).toBe(themes[updatedTheme])
  })
})
