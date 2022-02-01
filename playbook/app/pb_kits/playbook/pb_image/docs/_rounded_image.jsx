import React from 'react'

import Image from '../_image'

const RoundedImage = (props) => {
  return (
    <>
      <br />
      <div>
        <Image
            alt=""
            rounded
            size="xs"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt=""
            rounded
            size="sm"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt=""
            rounded
            size="md"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt=""
            rounded
            size="lg"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
      <div>
        <Image
            alt=""
            rounded
            size="xl"
            url="https://unsplash.it/500/400/?image=634"
            {...props}
        />
      </div>
    </>
  )
}

export default RoundedImage
