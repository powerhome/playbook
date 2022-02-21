import React from 'react'
import { Background } from '../..'

const BackgroundSize = (props) => (
  <Background
      alt="colorful background"
      backgroundSize="cover"
      className="background lazyload"
      imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
      padding="xl"
      {...props}
  />
)

export default BackgroundSize