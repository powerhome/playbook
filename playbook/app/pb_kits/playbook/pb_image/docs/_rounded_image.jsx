import React from 'react'
import { Image } from '../../'

const RoundedImage = (props) => {
  return (
    <>
      <Image
          rounded
          size="xs"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          rounded
          size="sm"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          rounded
          size="md"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          rounded
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          rounded
          size="xl"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
    </>
  )
}

export default RoundedImage
