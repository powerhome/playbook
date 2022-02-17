import React from 'react'
import { Background } from '../..'

const BackgroundSize = (props) => (
  <Background
      backgroundSize="contain"
      padding="xl"
      {...props}
  />
)

export default BackgroundSize