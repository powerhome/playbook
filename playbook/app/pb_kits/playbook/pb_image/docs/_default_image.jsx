import React from 'react'
import { Image } from '../../'

const DefaultImage = (props) => {
  return (
    <>
      <Image
          size="xs"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          size="sm"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          size="md"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          size="xl"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
    </>
  )
}

export default DefaultImage
