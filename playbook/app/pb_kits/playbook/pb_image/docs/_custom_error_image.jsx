import React from 'react'
import { Body, Image } from '../../'

const CustomErrorImage = (props) => {
  return (
    <>
      <Body text="Handle when an image fails to load or a broken link is passed. This is not neccessary most of the time." />
      <br />
      <br />
      <Body text="Alter the display when the image fails to load:" />
      <Image
          alt="This is the alt text!"
          onError={(e) => e.target.style.color = 'red'}
          rounded
          size="xs"
          url="not_a_valid_url"
          {...props}
      />
      <br />
      <br />
      <Body text="Give it an error class:" />
      <Image
          alt="This is the alt text!"
          onError={(e) => e.target.classList.add('image-error')}
          rounded
          size="sm"
          url="not_a_valid_url"
          {...props}
      />
      <br />
      <br />
      <Body text="Set an inline style" />
      <Image
          alt="This is the alt text!"
          onError={(e) => e.target.style.outline = '1px solid red'}
          rounded
          size="md"
          url="not_a_valid_url"
          {...props}
      />
      <br />
      <br />
      <Body text="Hide it completely!" />
      <Image
          alt="This is the alt text!"
          onError={(e) => e.target.style.display = 'none'}
          rounded
          size="md"
          url="not_a_valid_url"
          {...props}
      />
    </>
  )
}

export default CustomErrorImage
