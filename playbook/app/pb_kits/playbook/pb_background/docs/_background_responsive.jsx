import React, { Fragment as F } from 'react'
import Background from '../../pb_background/_background'

const BackgroundResponsive = (props) => (
  <F>
    <Background
        alt="colorful background"
        backgroundColor={{ xs: "primary", sm: "warning", md: "success", lg: "error", xl: "category_1" }}
        className="background lazyload"
        padding="xl"
        {...props}
    />
    <br/>
    <Background
        alt="colorful background"
        className="background lazyload"
        imageUrl={{
          xs: "https://unsplash.it/500/400/?image=633",
          sm: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          md: "https://unsplash.it/500/400/?image=633",
          lg: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          xl: "https://unsplash.it/500/400/?image=633"
        }}
        padding="xl"
        {...props}
    />
  </F>
)

export default BackgroundResponsive
