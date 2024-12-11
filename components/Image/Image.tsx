import Animated, { AnimatedProps } from 'react-native-reanimated'

import { ImageProps, Image as RNImage } from 'react-native'

const AnimatedImage = Animated.createAnimatedComponent(RNImage)

export const Image = (props: AnimatedProps<ImageProps>) => {
  return <AnimatedImage {...props} />
}
