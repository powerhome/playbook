import React from 'react'

import LoadingInline from '../_loading_inline'

const LoadingInlineLight = (props) => {
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

export default LoadingInlineLight
