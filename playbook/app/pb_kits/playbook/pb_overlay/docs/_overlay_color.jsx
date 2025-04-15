import React from 'react'

import Overlay from '../../pb_overlay/_overlay'
import Image from '../../pb_image/_image'
import Flex from '../../pb_flex/_flex'

const OverlayColor = () => (
    <Flex
        justify="around"
        wrap
    >
        <Overlay
            color="black"
            marginBottom="xxs"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
        <Overlay
            color="black"
            gradient={false}
            marginBottom="xxs"
            opacity="opacity_4"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
        <Overlay
            color="error"
            marginBottom="xxs"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
        <Overlay
            color="error"
            gradient={false}
            marginBottom="xxs"
            opacity="opacity_4"
        >
          <Image
              alt="picture of a misty forest"
              display="block"
              size="xl"
              url="https://unsplash.it/500/400/?image=634"
          />
        </Overlay>
    </Flex>
)

export default OverlayColor
