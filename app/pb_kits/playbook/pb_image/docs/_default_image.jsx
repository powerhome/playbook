import React from 'react'
import { Image } from '../../'

const DefaultImage = () => {
  return (
    <>
      <Image
          lazy
          url="https://unsplash.it/500/400/?image=634"
      />

      <br />
      <br />

      <Image
          url="https://unsplash.it/500/400/?image=634"
      />
    </>
  )
}

export default DefaultImage
