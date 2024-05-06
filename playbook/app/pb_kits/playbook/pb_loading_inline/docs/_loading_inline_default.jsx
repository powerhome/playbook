import React from 'react'

import LoadingInline from '../_loading_inline'

const LoadingInlineDefault = (props) => {
  return (
    <div>
      <LoadingInline
          {...props}
      />
      <LoadingInline
          align="center"
          {...props}
      />
      <LoadingInline
          align="right"
          {...props}
      />
    </div>
  )
}

export default LoadingInlineDefault
