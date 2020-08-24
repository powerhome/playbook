import React from 'react'
import { Background } from '../../'
import { Image } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background color="bg_gradient"> Background Kit </Background>
    <Background color="bg_dark"> Background Kit </Background>
    <Background color="bg_light"> Background Kit </Background>
    <Background image_url='https://www.proflowers.com/blog/wp-content/uploads/2016/04/hero-blue-flowers.jpg'>
      background image
    </Background>
  </div>
)

export default BackgroundDefault
