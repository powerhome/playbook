import React from 'react'
import { Image } from '../../'

const RoundedImage = () => {
  return (
    <>
      <Image
          rounded
          size="xs"
          url="https://unsplash.it/500/400/?image=634"
      />
      <Image
          rounded
          size="sm"
          url="https://unsplash.it/500/400/?image=634"
      />
      <Image
          rounded
          size="md"
          url="https://unsplash.it/500/400/?image=634"
      />
      <Image
          rounded
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
      />
      <Image
          rounded
          size="xl"
          url="https://unsplash.it/500/400/?image=634"
      />
      <Image
          rounded
          url="https://unsplash.it/500/400/?image=634"
      />
    </>
  )
}

export default RoundedImage
