import React from 'react'

import Image from '../_image'

const DefaultImage = (props) => {
  return (
    <>
      <br />
      <div>
        <Image
            alt="picture of a misty forest"
            size="xs"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt="picture of a misty forest"
            size="sm"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt="picture of a misty forest"
            size="md"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt="picture of a misty forest"
            size="lg"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt="picture of a misty forest"
            size="xl"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt="picture of a misty forest"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
    </>
  )
}

export default DefaultImage
