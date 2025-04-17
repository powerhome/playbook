import React from 'react'

import Overlay from '../../pb_overlay/_overlay'
import Image from '../../pb_image/_image'
import Flex from '../../pb_flex/_flex'

const OverlayGradientOpacity = () => (
    <Flex
        justify="around"
        wrap
    >
        <Overlay
            gradient={false}
            marginBottom="xxs"
            opacity="opacity_2"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              maxWidth="100%"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
        <Overlay
            gradient={false}
            marginBottom="xxs"
            opacity="opacity_8"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              maxWidth="100%"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
    </Flex>
)

export default OverlayGradientOpacity
