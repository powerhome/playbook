import React from 'react'

import Image from '../_image'

const RoundedImage = (props) => {
  return (
    <>
      <Image
          alt=""
          rounded
          size="xs"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          alt=""
          rounded
          size="sm"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          alt=""
          rounded
          size="md"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          alt=""
          rounded
          size="lg"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
      <Image
          alt=""
          rounded
          size="xl"
          url="https://unsplash.it/500/400/?image=634"
          {...props}
      />
    </>
  )
}

export default RoundedImage
