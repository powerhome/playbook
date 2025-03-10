import React, { Fragment as F } from 'react'
import { default as Background } from "../../pb_background/_background"

const BackgroundSize = (props) => (
  <F>
    <Background
        alt="colorful background"
        backgroundSize="auto"
        className="background lazyload"
        imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        padding="xl"
        {...props}
    />
    <br/>
    <Background
        alt="colorful background"
        backgroundSize="cover"
        className="background lazyload"
        imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        padding="xl"
        {...props}
    />
    <br/>
    <Background
        alt="colorful background"
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        className="background lazyload"
        imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
        padding="xl"
        {...props}
    />
  </F>
)

export default BackgroundSize