import React from 'react'
import { Background } from '../../'
import { Image } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background backgroundColor="gradient"> Background Kit </Background>
    <Background backgroundColor="dark"> Background Kit </Background>
    <Background backgroundColor="light"> Background Kit </Background>
    <Background backgroundColor=""> Background Kit </Background>
    {/* <Background image_url='https://www.proflowers.com/blog/wp-content/uploads/2016/04/hero-blue-flowers.jpg'>
      background image
    </Background> */}
  </div>
)

export default BackgroundDefault
