import React, { FC, ReactElement } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import {
  RenderHookOptions,
  RenderHookResult,
  render,
  renderHook,
} from '@testing-library/react-native'

type Options = Parameters<typeof render>[1]

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
)

const customRender = (ui: ReactElement, options?: Options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

const customRenderHook = <Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: RenderHookOptions<Props>
): RenderHookResult<Result, Props> =>
  renderHook(renderCallback, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react-native'
export { customRender as render }
export { customRenderHook as renderHook }
