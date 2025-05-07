import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@supabase/supabase-js'
import { Appearance } from 'react-native'
import { create } from 'zustand'
import { StateStorage, createJSONStorage, persist } from 'zustand/middleware'

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const data = (await AsyncStorage.getItem(name)) || null

    return data
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value)
  },
  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name)
  },
}

export type Product = {
  id: number
  name: string
  quantity: number
  unityValue: number
  totalValue: number
}

export type Theme = 'dark' | 'light'

interface AppState {
  products: Product[]
  setProducts: (product: Product[]) => void
  addProduct: (product: Product) => void
  removeProduct: (id: number) => void
  editProduct: (product: Product) => void
  setTheme: (theme: Theme) => void
  theme: Theme
  setFaceIdAccess: (permission: boolean) => void
  faceIdAccess: boolean
  user: User | null
  setAuthUser: (user: User | null) => void
  productSearch: string
  setProductSearch: (value: string) => void
  isReady: boolean
  setIsReady: (value: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (products: Product[]) => set({ products }),
      addProduct: (product: Product) =>
        set((state) => ({ products: [...state.products, product] })),
      editProduct: (product: Product) =>
        set((state) => {
          const productIndex = state.products.findIndex((item) => item.id === product.id)
          if (productIndex === -1) return state

          const newProducts = [...state.products]
          newProducts[productIndex] = product
          return { products: newProducts }
        }),
      removeProduct: (id: number) =>
        set((state) => ({ products: state.products.filter((item) => item.id !== id) })),
      setTheme: (theme: Theme) => set({ theme }),
      theme: Appearance.getColorScheme() || 'light',
      setFaceIdAccess: (faceIdAccess: boolean) => set({ faceIdAccess }),
      faceIdAccess: false,
      user: null,
      setAuthUser: (user: User | null) => set({ user }),
      productSearch: '',
      setProductSearch: (productSearch: string) => set({ productSearch }),
      isReady: false,
      setIsReady: (isReady: boolean) => set({ isReady }),
    }),
    {
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['user', 'productSearch', 'isReady'].includes(key)
          )
        ),
      name: 'challenge-cumbuca-storage',
      storage: createJSONStorage(() => storage),
    }
  )
)
