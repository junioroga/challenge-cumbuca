import { useAppStore } from '@/store'
import { themes } from '@/styles/themes'
import { useMemo } from 'react'

export default function useTheme() {
  const { theme } = useAppStore()

  return useMemo(() => themes[theme], [theme])
}
